import { gemini } from "@/config/gemini";
import { convertToCoreMessages, streamText } from "ai";
import { Chat } from "@/models/chat";
import { connectToDB } from "@/db/connect";
import { nanoid } from "nanoid";
import axios from "axios";

export async function POST(req: Request) {
  try {
    await connectToDB();
    console.log("[CHAT] Connected to DB ✅");

    const { messages, fileUrl, fileMetadata, chatId, userId } =
      await req.json();
    console.log("[CHAT] Request Body:", {
      userId,
      chatId,
      fileUrl,
      fileMetadata,
    });

    const lastUserMessage = messages[messages.length - 1];
    console.log("[CHAT] Last user message:", lastUserMessage);

    let memoryContext = "";
    let memoriesFound = 0;

    if (userId && lastUserMessage?.content) {
      try {
        const query =
          typeof lastUserMessage.content === "string"
            ? lastUserMessage.content
            : lastUserMessage.content.find(
                (c: { type: string }) => c.type === "text"
              )?.text || "";

        const memoryResponse = await axios.post<{
          context: string;
          memoriesFound: number;
        }>(
          `${
            process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
          }/api/v1/memory`,
          { action: "getContext", userId, query },
          { headers: { "Content-Type": "application/json" } }
        );

        if (memoryResponse.status === 200) {
          memoryContext = memoryResponse.data.context;
          memoriesFound = memoryResponse.data.memoriesFound;
        } else {
          console.warn("[MEMORY] API failed:", memoryResponse.status);
        }
      } catch (err) {
        console.error("[MEMORY] Error getting memory:", err);
      }
    }

    const enhanced = [...messages];
    let fileAttachment = null;
    let enhancedUserMessage = null;

    // Handle file attachment
    if (fileUrl && fileMetadata && messages.length > 0) {
      fileAttachment = {
        fileId: fileMetadata.fileId || nanoid(),
        fileName: fileMetadata.fileName,
        fileUrl: fileUrl,
        mimeType: fileMetadata.mimeType,
        size: fileMetadata.size,
        uploadedAt: new Date(),
      };
      console.log("[FILE] File attachment created:", fileAttachment);

      const last = messages[messages.length - 1];
      if (last.role === "user") {
        const isImage = /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(fileUrl);

        // Create enhanced message for AI processing
        enhancedUserMessage = {
          role: "user",
          content: [
            { type: "text", text: last.content || "" },
            isImage
              ? { type: "image", image: fileUrl }
              : {
                  type: "file",
                  data: fileUrl,
                  mimeType: fileMetadata.mimeType || "application/pdf",
                },
          ],
          files: [fileAttachment],
        };

        enhanced[enhanced.length - 1] = enhancedUserMessage;
        console.log(
          "[FILE] Enhanced user message with file:",
          enhancedUserMessage
        );
      }
    }

    // Trim context
    const maxContextLength = 100000;
    let count = 0;
    const filtered: typeof enhanced = [];
    for (let i = enhanced.length - 1; i >= 0; i--) {
      const msg = enhanced[i];
      const length =
        typeof msg.content === "string"
          ? msg.content.length
          : JSON.stringify(msg.content).length;
      const tokens = length / 4;
      if (count + tokens > maxContextLength) break;
      count += tokens;
      filtered.unshift(msg);
    }

    if (memoryContext) {
      filtered.unshift({
        role: "system",
        content: `You are a helpful AI assistant. Here's relevant context from previous conversations with this user: ${memoryContext}      
        Use this context naturally to provide more personalized responses. Don't explicitly mention "I remember" unless relevant.`,
      });
    }

    const core = convertToCoreMessages(filtered);

    const result = streamText({
      model: gemini("gemini-2.5-flash"),
      messages: core,
      maxTokens: 4000,
    });

    const resultStream = result.toDataStream();

    const chunks = [];
    for await (const chunk of result.textStream) {
      chunks.push(chunk);
    }
    const responseText = chunks.join("");

    // Save to database
    if (chatId && userId) {
      const originalUserMessage = messages[messages.length - 1];

      const userMessage = {
        id: nanoid(),
        role: "user",
        content: originalUserMessage.content,
        timestamp: new Date(),
        ...(fileAttachment && { files: [fileAttachment] }),
      };

      console.log("[USER MESSAGE] User message for DB:", userMessage);

      const assistantMessage = {
        id: nanoid(),
        role: "assistant",
        content: responseText,
        timestamp: new Date(),
      };

      console.log("[DB] Saving messages to chat:", chatId);

      try {
        const updatedChat = await Chat.findByIdAndUpdate(
          chatId,
          {
            $push: { messages: { $each: [userMessage, assistantMessage] } },
            $set: { updatedAt: new Date() },
          },
          { new: true }
        );
        console.log("[DB] Chat updated successfully ✅");
        console.log(
          "[DB] Last user message saved:",
          updatedChat.messages[updatedChat.messages.length - 2]
        );
      } catch (dbError) {
        console.error("[DB] Error updating chat:", dbError);
      }
    }

    if (userId) {
      const userContent =
        typeof lastUserMessage.content === "string"
          ? lastUserMessage.content
          : lastUserMessage.content.find(
              (c: { type: string }) => c.type === "text"
            )?.text || "";

      if (userContent) {
        try {
          await axios.post(
            `${
              process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/api/v1/memory`,
            {
              action: "store",
              userId,
              content: userContent,
              metadata: {
                role: "user",
                type: "conversation",
                ...(fileAttachment && {
                  hasFile: true,
                  fileName: fileAttachment.fileName,
                }),
              },
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
        } catch (err) {
          console.error("[MEMORY] Error storing user message:", err);
        }
      }

      if (responseText && responseText.length > 30) {
        try {
          const assistantMemoryRes = await axios.post(
            `${
              process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
            }/api/v1/memory`,
            {
              action: "store",
              userId,
              content: responseText,
              metadata: { role: "assistant", type: "conversation" },
            },
            {
              headers: { "Content-Type": "application/json" },
            }
          );
          console.log(
            "[MEMORY] Stored assistant message:",
            assistantMemoryRes.status
          );
        } catch (err) {
          console.error("[MEMORY] Error storing assistant message:", err);
        }
      }
    }

    return new Response(resultStream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "X-Memory-Context": memoriesFound > 0 ? "true" : "false",
        "X-Memories-Found": memoriesFound.toString(),
      },
    });
  } catch (e) {
    console.error("[ERROR] Chat API failed:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), {
      status: 500,
    });
  }
}

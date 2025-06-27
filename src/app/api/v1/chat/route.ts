import { gemini } from "@/config/gemini";
import { convertToCoreMessages, streamText } from "ai";
import { Chat } from "@/models/chat";
import { connectToDB } from "@/lib/db";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { messages, fileUrl, chatId, userId } = await req.json();
    const enhanced = [...messages];

    // Enhance with file content (if exists)
    if (fileUrl && messages.length > 0) {
      const last = messages[messages.length - 1];
      if (last.role === "user") {
        const isImage = /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(fileUrl);
        if (isImage) {
          enhanced[enhanced.length - 1] = {
            role: "user",
            content: [
              { type: "text", text: last.content || "" },
              { type: "image", image: fileUrl }
            ]
          };
        } else {
          enhanced[enhanced.length - 1] = {
            role: "user",
            content: [
              { type: "text", text: last.content || "" },
              { type: "file", data: fileUrl, mimeType: "application/pdf" }
            ]
          };
        }
      }
    }

    // Context window trimming
    const maxContextLength = 100000;
    let count = 0;
    const filtered: typeof enhanced = [];
    for (let i = enhanced.length - 1; i >= 0; i--) {
      const msg = enhanced[i];
      const length = typeof msg.content === "string"
        ? msg.content.length
        : JSON.stringify(msg.content).length;
      const tokens = length / 4;
      if (count + tokens > maxContextLength) break;
      count += tokens;
      filtered.unshift(msg);
    }

    const core = convertToCoreMessages(filtered);

    // Run model
    const result = streamText({
      model: gemini("gemini-2.5-flash"),
      messages: core,
      maxTokens: 4000,
    });

    // Convert streamed result to text
    const fullResponse = result.toDataStreamResponse();

    // Extract text from the Response object
    const responseText = await fullResponse.text();

    // Save both messages to DB
    if (chatId && userId) {
      const userMessage = {
        id: nanoid(),
        role: "user",
        content: messages[messages.length - 1].content,
        createdAt: new Date(),
      };

      const assistantMessage = {
        id: nanoid(),
        role: "assistant",
        content: responseText,
        createdAt: new Date(),
      };

      await Chat.findByIdAndUpdate(chatId, {
        $push: {
          messages: { $each: [userMessage, assistantMessage] },
        },
      });
    }

    return new Response(responseText, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  } catch (e) {
    console.error("Chat API error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
  }
}
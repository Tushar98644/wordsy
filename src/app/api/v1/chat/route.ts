import { gemini } from "@/config/gemini";
import { convertToCoreMessages, streamText } from "ai";
import { Chat } from "@/models/chat";
import { connectToDB } from "@/lib/db";
import { nanoid } from "nanoid";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { messages, fileUrl, chatId, userId } = await req.json();
    const lastUserMessage = messages[messages.length - 1];

    let memoryContext = '';
    let memoriesFound = 0;

    if (userId && lastUserMessage?.content) {
      try {
        const memoryResponse = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/memory`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'getContext',
            userId,
            query: typeof lastUserMessage.content === 'string'
              ? lastUserMessage.content
              : lastUserMessage.content.find((c: { type: string }) => c.type === 'text')?.text || ''
          })
        });

        if (memoryResponse.ok) {
          // Check if response is actually JSON
          const contentType = memoryResponse.headers.get('content-type');
          if (contentType && contentType.includes('application/json')) {
            const memoryData = await memoryResponse.json();
            memoryContext = memoryData.context;
            memoriesFound = memoryData.memoriesFound;
          } else {
            console.error('Memory API returned non-JSON response:', await memoryResponse.text());
          }
        } else {
          console.error('Memory API error:', memoryResponse.status, memoryResponse.statusText);
          const responseText = await memoryResponse.text();
          console.error('Response body:', responseText);
        }
      } catch (error) {
        console.error('Failed to get memory context:', error);
      }
    }

    const enhanced = [...messages];

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

    // Add memory context to system message if available
    if (memoryContext) {
      filtered.unshift({
        role: "system",
        content: `You are a helpful AI assistant. Here's relevant context from previous conversations with this user: ${memoryContext}      
        Use this context naturally to provide more personalized responses. Don't explicitly mention "I remember" unless specifically relevant. Respond naturally as if you know the user.`
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

    if (userId) {
      const userContent = typeof lastUserMessage.content === 'string'
        ? lastUserMessage.content
        : lastUserMessage.content.find((c: { type: string }) => c.type === 'text')?.text || '';

      if (userContent) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/memory`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'store',
              userId,
              content: userContent,
              metadata: { role: 'user', type: 'conversation' }
            })
          });
          
          if (!response.ok) {
            console.error('Failed to store user message:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Failed to store user message:', error);
        }
      }

      if (responseText && responseText.length > 30) {
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/v1/memory`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              action: 'store',
              userId,
              content: responseText,
              metadata: { role: 'assistant', type: 'conversation' }
            })
          });

          if (!response.ok) {
            console.error('Failed to store assistant message:', response.status, response.statusText);
          }
        } catch (error) {
          console.error('Failed to store assistant message:', error);
        }
      }
    }

    const response = new Response(resultStream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "X-Memory-Context": memoriesFound > 0 ? 'true' : 'false',
        "X-Memories-Found": memoriesFound.toString()
      },
    });

    return response;

  } catch (e) {
    console.error("Chat API error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
  }
}
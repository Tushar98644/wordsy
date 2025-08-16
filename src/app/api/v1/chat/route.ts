import { gemini } from "@/config/gemini";
import { connectToDB } from "@/db/connect";
import { Thread } from "@/db/models/thread";
import { convertToModelMessages, streamText } from "ai";

const saveMessages = async (
  threadId: string,
  userMessage: { role: "user"; content: string; files?: any[] },
  assistantMessage: { role: "assistant"; content: string }
) => {
  try {
    await connectToDB();
    
    const thread = await Thread.findById(threadId);
    if (!thread) {
      console.error("Thread not found:", threadId);
      return;
    }

    thread.messages.push(userMessage, assistantMessage);
    thread.markModified('messages');
    await thread.save();
    
    console.log("Messages saved directly to database");
  } catch (error) {
    console.error("💥 Direct save error:", error);
  }
};

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, threadId } = await req.json();

  const userMessage = messages[messages.length - 1];

  const result = streamText({
    model: gemini("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
    onFinish: async ({ text }) => {
      await saveMessages(
        threadId,
        {
          role: userMessage.role,
          content: userMessage.parts.map((part: { type: string; text: any }) => 
            part.type === 'text' ? part.text : ''
          ).join(''),
        },
        {
          role: 'assistant',
          content: text,
        }
      );
    },
  });

  return result.toUIMessageStreamResponse();
}
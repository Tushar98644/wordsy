import { gemini } from "@/config/gemini";
import { connectToDB } from "@/db/connect";
import { Message } from "@/db/models/message";
import { Thread } from "@/db/models/thread";
import { FileMetadata } from "@/types/file";
import { convertToModelMessages, streamText } from "ai";

const saveMessages = async (
  threadId: string,
  userMessage: { role: "user"; content: string; files?: FileMetadata[] },
  assistantMessage: { role: "assistant"; content: string }
) => {
  try {
    await connectToDB();
    
    await Message.create({
      threadId,
      role: userMessage.role,
      content: userMessage.content,
      files: userMessage.files,
    });
    
    await Message.create({
      threadId,
      role: assistantMessage.role,
      content: assistantMessage.content,
    });
    
    await Thread.findByIdAndUpdate(threadId, { $set: { updatedAt: new Date() } });
  } catch (error) {
    console.error("Direct save error:", error);
  }
};

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages, threadId, files } = await req.json();

  const userMessage = messages[messages.length - 1];

  const modelMessages = convertToModelMessages(messages);

  if (files.length > 0) {
    const fileSummaryText =
      "Attached files (URL, filename, mimeType, size in bytes):\n" +
      files
        .map(
          (f: FileMetadata, i: number) =>
            `${i + 1}. ${f.fileUrl} — ${f.fileName} — ${f.mimeType} — ${f.size}`
        )
        .join("\n") +
      "\nPlease analyze or reference those files as needed.";

    modelMessages.push({
      role: "user",
      content: fileSummaryText,
    });
  }

  const result = streamText({
    model: gemini("gemini-2.5-flash"),
    messages: modelMessages,
    onFinish: async ({ text }) => {
      await saveMessages(
        threadId,
        {
          role: userMessage.role,
          content: userMessage.parts
            .map((part: { type: string; text: any }) =>
              part.type === "text" ? part.text : ""
            )
            .join(""),
          files
        },
        {
          role: "assistant",
          content: text,
        }
      );
    },
  });

  return result.toUIMessageStreamResponse();
}
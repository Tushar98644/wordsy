import { auth } from "@/config/auth/server";
import { gemini } from "@/config/gemini";
import {
  convertToModelMessages,
  streamText,
  createUIMessageStreamResponse,
  type UIMessage,
} from "ai";
import axios from "axios";
import { headers } from "next/headers";

// const saveMessages = async (
//   threadId: string,
//   userMessage: { role: "user"; content: string; files?: any[] },
//   assistantMessage: { role: "assistant"; content: string }
// ) => {
//   try {
//     await axios.post(
//       `${process.env.BETTER_AUTH_URL}/api/v1/${threadId}/messages`,
//       {
//         threadId,
//         message: userMessage,
//       }
//     );

//     await axios.post(
//       `${process.env.BETTER_AUTH_URL}/api/v1/${threadId}/messages`,
//       {
//         threadId,
//         message: assistantMessage,
//       }
//     );
//   } catch (error) {
//     console.error("[MESSAGES] Save error:", error);
//   }
// };

// const extractTextFromUIMessage = (msg: UIMessage | undefined) => {
//   if (!msg) return "";
//   return (msg.parts ?? [])
//     .map((p: any) => {
//       if (typeof p === "string") return p;
//       if (typeof p.content === "string") return p.content;
//       if (typeof p.text === "string") return p.text;
//       if (typeof p.textDelta === "string") return p.textDelta;
//       return "";
//     })
//     .join("");
// };

// export async function POST(req: Request) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session) {
//     return Response.json({ error: "Unauthorized" }, { status: 401 });
//   }

//   const userEmail = session?.user?.email;
//   if (!userEmail) {
//     return Response.json({ error: "User email not found" }, { status: 400 });
//   }

//   try {
//     const { message, fileUrl, fileMetadata, threadId } = await req.json();
//     console.log("[CHAT] Received message:", message);

//     if (!message || !message.role || !message.content) {
//       return Response.json({ error: "Message not found" }, { status: 400 });
//     }

//     const userQuery =
//       typeof message?.content === "string"
//         ? message.content
//         : message?.content?.find(
//             (c: { type: string; text?: string }) => c.type === "text"
//           )?.text ?? "";

//     const aiMessages = [message];

//     const result = streamText({
//       model: gemini("gemini-2.5-flash"),
//       messages: convertToModelMessages(aiMessages),
//     });

//     const uiStream = result.toUIMessageStream?.({
//       originalMessages: aiMessages as any,
//       onFinish: async ({
//         responseMessage,
//       }: {
//         responseMessage?: UIMessage;
//       }) => {
//         try {
//           if (!threadId) return;

//           const userMessageForDB = {
//             role: "user" as const,
//             content: userQuery,
//             ...(fileUrl &&
//               fileMetadata && {
//                 files: [
//                   {
//                     fileId: fileMetadata.fileId,
//                     fileName: fileMetadata.fileName,
//                     fileUrl,
//                     mimeType: fileMetadata.mimeType,
//                     size: fileMetadata.size,
//                     uploadedAt: new Date(),
//                   },
//                 ],
//               }),
//           };

//           const assistantText = extractTextFromUIMessage(responseMessage);

//           const assistantMessageForDB = {
//             role: "assistant" as const,
//             content: assistantText,
//           };

//           await saveMessages(threadId, userMessageForDB, assistantMessageForDB);
//         } catch (err) {
//           console.error("[ONFINISH] Persist error:", err);
//         }
//       },
//     });

//     const uiResponse = createUIMessageStreamResponse({
//       stream: uiStream,
//       status: 200,
//       headers: {
//         "Content-Type": "text/plain",
//       },
//     });

//     return uiResponse;
//   } catch (error) {
//     console.error("[CHAT] Error:", error);
//     return new Response(JSON.stringify({ error: (error as Error).message }), {
//       status: 500,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     });
//   }
// }

export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages } = await req.json();

  const result = streamText({
    model: gemini("gemini-2.5-flash"),
    messages: convertToModelMessages(messages),
  })

  const uiResponse = createUIMessageStreamResponse({
    stream: result.toUIMessageStream(),
    status: 200,
    headers: {
      "Content-Type": "text/plain",
    },
  }) 
  return result.toUIMessageStreamResponse();
}

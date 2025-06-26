import { gemini } from "@/config/gemini";
import { convertToCoreMessages, streamText } from "ai";

export async function POST(req: Request) {
  try {
    const { messages, fileUrl } = await req.json();
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
    const result = streamText({
      model: gemini("gemini-2.5-flash"),
      messages: core,
      maxTokens: 4000,
    });

    return result.toDataStreamResponse();
  } catch (e) {
    console.error("Chat API error:", e);
    return new Response(JSON.stringify({ error: (e as Error).message }), { status: 500 });
  }
}

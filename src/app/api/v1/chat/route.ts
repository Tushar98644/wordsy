import { gemini } from "@/config/gemini";
import { convertToCoreMessages, streamText } from "ai";
// import { createStreamableValue } from "ai/rsc";

export async function POST(req: Request) {
  try {
    const { messages, fileUrl } = await req.json();

    // Add file context to last message
    if (fileUrl && messages.length > 0) {
      const lastUserMessage = messages[messages.length - 1];
      if (lastUserMessage.role === "user") {
        messages[messages.length - 1] = {
          ...lastUserMessage,
          content: `[File: ${fileUrl}] ${lastUserMessage.content}`,
        };
      }
    }

    // Context handling
    const maxContextLength = 128000;
    let tokenCount = 0;
    const filteredMessages = [];

    for (let i = messages.length - 1; i >= 0; i--) {
      const message = messages[i];
      const tokens = message.content.length / 4;
      if (tokenCount + tokens > maxContextLength) break;
      tokenCount += tokens;
      filteredMessages.unshift(message);
    }

    const coreMessages = convertToCoreMessages(filteredMessages); // Use filtered messages

    // Option 1: Using streamText with proper streaming response
    const result = streamText({
      model: gemini("gemini-1.5-flash"),
      messages: coreMessages,
    });

    return result.toDataStreamResponse();

  } catch (error) {
    console.error("Error in chat API:", error);
    
    // Always return a Response object
    return new Response(
      JSON.stringify({ 
        error: "Failed to generate response",
        details: error instanceof Error ? error.message : "Unknown error"
      }), 
      { 
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}

// export async function POST_ALTERNATIVE(req: Request) {
//   try {
//     const { messages, fileUrl } = await req.json();

//     // Add file context to last message
//     if (fileUrl && messages.length > 0) {
//       const lastUserMessage = messages[messages.length - 1];
//       if (lastUserMessage.role === "user") {
//         messages[messages.length - 1] = {
//           ...lastUserMessage,
//           content: `[File: ${fileUrl}] ${lastUserMessage.content}`,
//         };
//       }
//     }

//     // Context handling
//     const maxContextLength = 128000;
//     let tokenCount = 0;
//     const filteredMessages = [];

//     for (let i = messages.length - 1; i >= 0; i--) {
//       const message = messages[i];
//       const tokens = message.content.length / 4;
//       if (tokenCount + tokens > maxContextLength) break;
//       tokenCount += tokens;
//       filteredMessages.unshift(message);
//     }

//     const coreMessages = convertToCoreMessages(filteredMessages);
//     const stream = createStreamableValue();
    
//     // Start streaming in background
//     (async () => {
//       try {
//         const { textStream } = await streamText({
//           model: gemini("gemini-1.5-flash"),
//           messages: coreMessages,
//         });
        
//         for await (const chunk of textStream) {
//           stream.update(chunk);
//         }

//         stream.done();
//       } catch (error) {
//         console.error("Error in streaming response:", error);
//         stream.update({ error: "Failed to generate response" });
//         stream.done();
//       }
//     })();

//     // Return the streamable value as a Response
//     return new Response(
//       JSON.stringify({ stream: stream.value }), 
//       {
//         headers: { "Content-Type": "application/json" }
//       }
//     );

//   } catch (error) {
//     console.error("Error in chat API:", error);
    
//     return new Response(
//       JSON.stringify({ 
//         error: "Failed to generate response",
//         details: error instanceof Error ? error.message : "Unknown error"
//       }), 
//       { 
//         status: 500,
//         headers: { "Content-Type": "application/json" }
//       }
//     );
//   }
// }
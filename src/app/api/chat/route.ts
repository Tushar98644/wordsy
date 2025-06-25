import { openai } from '@ai-sdk/openai';
import { streamText } from 'ai';

export async function POST(req: Request) {
  const { messages, fileUrl } = await req.json();

  // Add file context to last message
  if (fileUrl && messages.length > 0) {
    const lastUserMessage = messages[messages.length - 1];
    if (lastUserMessage.role === 'user') {
      messages[messages.length - 1] = {
        ...lastUserMessage,
        content: `[File: ${fileUrl}] ${lastUserMessage.content}`
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

  const response = streamText({
      model: openai('gpt-4o'),
      messages: filteredMessages,
  });

  return response.toDataStreamResponse();
}
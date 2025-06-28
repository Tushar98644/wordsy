import { ChatService } from "@/lib/chat/chat-service";
import { MemoryService } from "@/lib/chat/memory-service";
import { MessageProcessor } from "@/lib/chat/message-processor";
import { connectToDB } from "@/lib/db";
import { ChatRequest } from "@/types/chat";

export async function POST(req: Request) {
  try {
    await connectToDB();

    const { messages, fileUrl, chatId, userId }: ChatRequest = await req.json();
    const lastUserMessage = messages[messages.length - 1];
    
    const chatService = new ChatService();
    const memoryService = new MemoryService();

    // Get memory context
    let memoryContext = '';
    let memoriesFound = 0;

    if (userId && lastUserMessage?.content) {
      const query = MessageProcessor.extractTextContent(lastUserMessage.content);
      const memory = await memoryService.getContext(userId, query);
      memoryContext = memory.context;
      memoriesFound = memory.memoriesFound;
    }

    // Process messages
    let processedMessages = MessageProcessor.enhanceWithFile(messages, fileUrl || '');
    processedMessages = MessageProcessor.trimContextWindow(processedMessages);
    processedMessages = MessageProcessor.addMemoryContext(processedMessages, memoryContext);

    // Generate response
    const { stream, text: responseText } = await chatService.generateResponse(processedMessages);

    // Save to database
    if (chatId && userId) {
      await chatService.saveToDatabase(chatId, lastUserMessage, responseText);
    }

    // Store in memory
    if (userId) {
      await chatService.processMemory(userId, lastUserMessage, responseText);
    }

    // Return response
    return new Response(stream, {
      status: 200,
      headers: {
        "Content-Type": "text/plain",
        "X-Memory-Context": memoriesFound > 0 ? 'true' : 'false',
        "X-Memories-Found": memoriesFound.toString()
      },
    });

  } catch (error) {
    console.error("Chat API error:", error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }), 
      { status: 500 }
    );
  }
}
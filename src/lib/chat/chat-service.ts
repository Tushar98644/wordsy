import { gemini } from "@/config/gemini";
import { convertToCoreMessages, streamText } from "ai";
import { Chat } from "@/models/chat";
import { nanoid } from "nanoid";
import { MemoryService } from "./memory-service";
import { ChatMessage } from "@/types/chat";
import { MessageProcessor } from "./message-processor";

export class ChatService {
  private memoryService: MemoryService;

  constructor() {
    this.memoryService = new MemoryService();
  }

  async generateResponse(messages: ChatMessage[]): Promise<{ stream: any; text: string }> {
    const trimmedMessages = MessageProcessor.trimContextWindow(messages);
    const coreMessages = convertToCoreMessages(trimmedMessages.map(msg => ({
      ...msg,
      content: typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content)
    })));

    const result = streamText({
      model: gemini("gemini-2.5-flash"),
      messages: coreMessages,
      maxTokens: 4000,
    });

    const chunks = [];
    for await (const chunk of result.textStream) {
      chunks.push(chunk);
    }

    return {
      stream: result.toDataStream(),
      text: chunks.join("")
    };
  }

  async saveToDatabase(chatId: string, userMessage: ChatMessage, assistantResponse: string): Promise<void> {
    const userMsg = {
      id: nanoid(),
      role: "user" as const,
      content: userMessage.content,
      createdAt: new Date(),
    };

    const assistantMsg = {
      id: nanoid(),
      role: "assistant" as const,
      content: assistantResponse,
      createdAt: new Date(),
    };

    await Chat.findByIdAndUpdate(chatId, {
      $push: {
        messages: { $each: [userMsg, assistantMsg] },
      },
    });
  }

  async processMemory(userId: string, userMessage: ChatMessage, assistantResponse: string): Promise<void> {
    const userContent = MessageProcessor.extractTextContent(userMessage.content);
    
    if (userContent) {
      await this.memoryService.storeMessage(userId, userContent, 'user');
    }
    
    if (assistantResponse) {
      await this.memoryService.storeMessage(userId, assistantResponse, 'assistant');
    }
  }
}
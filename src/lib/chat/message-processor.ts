import { ChatMessage } from "@/types/chat";

export class MessageProcessor {
    static enhanceWithFile(messages: ChatMessage[], fileUrl: string): ChatMessage[] {
      if (!fileUrl || messages.length === 0) return messages;
  
      const enhanced = [...messages];
      const lastMessage = messages[messages.length - 1];
  
      if (lastMessage.role === "user") {
        const isImage = /\.(jpg|jpeg|png|gif|webp|bmp)$/i.test(fileUrl);
        
        enhanced[enhanced.length - 1] = {
          ...lastMessage,
          content: [
            { type: "text", text: lastMessage.content || "" },
            isImage 
              ? { type: "image", image: fileUrl }
              : { type: "file", data: fileUrl, mimeType: "application/pdf" }
          ]
        };
      }
  
      return enhanced;
    }
  
    static trimContextWindow(messages: ChatMessage[], maxLength = 100000): ChatMessage[] {
      let tokenCount = 0;
      const filtered: ChatMessage[] = [];
  
      for (let i = messages.length - 1; i >= 0; i--) {
        const msg = messages[i];
        const contentLength = typeof msg.content === "string"
          ? msg.content.length
          : JSON.stringify(msg.content).length;
        
        const tokens = contentLength / 4;
        
        if (tokenCount + tokens > maxLength) break;
        
        tokenCount += tokens;
        filtered.unshift(msg);
      }
  
      return filtered;
    }
  
    static addMemoryContext(messages: ChatMessage[], memoryContext: string): ChatMessage[] {
      if (!memoryContext) return messages;
  
      const systemMessage: ChatMessage = {
        role: "system",
        content: `You are a helpful AI assistant. Here's relevant context from previous conversations with this user: ${memoryContext}
        
  Use this context naturally to provide more personalized responses. Don't explicitly mention "I remember" unless specifically relevant. Respond naturally as if you know the user.`
      };
  
      return [systemMessage, ...messages];
    }
  
    static extractTextContent(content: string | any[]): string {
      return typeof content === 'string'
        ? content
        : content.find((c: { type: string }) => c.type === 'text')?.text || '';
    }
  }
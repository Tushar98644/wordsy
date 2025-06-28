export interface ChatMessage {
    id?: string;
    role: 'user' | 'assistant' | 'system';
    content: string | any[];
    createdAt?: Date;
  }
  
  export interface ChatRequest {
    messages: ChatMessage[];
    fileUrl?: string;
    chatId?: string;
    userId?: string;
  }
  
  export interface MemoryContext {
    context: string;
    memoriesFound: number;
  }
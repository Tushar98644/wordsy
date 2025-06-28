import { MemoryContext } from "@/types/chat";

export class MemoryService {
    private baseUrl: string;
  
    constructor() {
      this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    }
  
    async getContext(userId: string, query: string): Promise<MemoryContext> {
      try {
        const response = await fetch(`${this.baseUrl}/api/v1/memory`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'getContext',
            userId,
            query
          })
        });
  
        if (!response.ok) {
          console.error('Memory API error:', response.status, response.statusText);
          return { context: '', memoriesFound: 0 };
        }
  
        const contentType = response.headers.get('content-type');
        if (!contentType?.includes('application/json')) {
          console.error('Memory API returned non-JSON response');
          return { context: '', memoriesFound: 0 };
        }
  
        return await response.json();
      } catch (error) {
        console.error('Failed to get memory context:', error);
        return { context: '', memoriesFound: 0 };
      }
    }
  
    async storeMessage(userId: string, content: string, role: 'user' | 'assistant'): Promise<void> {
      if (!content || (role === 'assistant' && content.length <= 30)) {
        return;
      }
  
      try {
        const response = await fetch(`${this.baseUrl}/api/v1/memory`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            action: 'store',
            userId,
            content,
            metadata: { role, type: 'conversation' }
          })
        });
  
        if (!response.ok) {
          console.error(`Failed to store ${role} message:`, response.status, response.statusText);
        }
      } catch (error) {
        console.error(`Failed to store ${role} message:`, error);
      }
    }
  }
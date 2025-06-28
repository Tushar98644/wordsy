import { MemoryContext } from "@/types/chat";
import axios from "axios";

export class MemoryService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
  }

  async getContext(userId: string, query: string): Promise<MemoryContext> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/v1/memory`, {
        action: 'getContext',
        userId,
        query
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status !== 200) {
        console.error('Memory API error:', response.status, response.statusText);
        return { context: '', memoriesFound: 0 };
      }

      return response.data;
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
      const response = await axios.post(`${this.baseUrl}/api/v1/memory`, {
        action: 'store',
        userId,
        content,
        metadata: { role, type: 'conversation' },
      }, {
        headers: { 'Content-Type': 'application/json' }
      });

      if (response.status !== 200) {
        console.error(`Failed to store ${role} message:`, response.status, response.statusText);
      }
    } catch (error) {
      console.error(`Failed to store ${role} message:`, error);
    }
  }
}
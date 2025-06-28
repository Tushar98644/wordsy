import { memoryClient } from "./client";
import { shouldStoreMessage } from "@/utils/memory";

const VERSION = 'v2';

type MemoryContent = {
  role: 'user' | 'assistant';
  content: string;
};

export async function getContext(userId: string, query: string, limit: number = 3) {
  try {
    const memories = await memoryClient.search(query, {
      limit,
      user_id: userId,
      version: VERSION,
    });

    const context = memories.map(m => m.memory).join('\n').substring(0, 1500);

    return { context, memoriesFound: memories.length };
  } catch (error) {
    console.error('Memory search failed:', error);
    return { context: '', memoriesFound: 0 };
  }
}

export async function storeMemory(userId: string, content: MemoryContent[], metadata?: Record<string, any>) {
  if (!shouldStoreMessage(content[0].content)) {
    return { stored: false, reason: 'Not meaningful enough' };
  }

  try {
    const memory = await memoryClient.add(content, {
      timestamp: Date.now(),
      ...metadata,
      user_id: userId,
      version: VERSION,
    });

    return { stored: true, memory };
  } catch (error) {
    console.error('Memory storage failed:', error);
    return { stored: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

export async function getUserMemories(userId: string, limit: number = 100) {
  try {
    const memories = await memoryClient.getAll({
      user_id: userId,
      version: VERSION,
      limit,
    });

    return { memories };
  } catch (error) {
    console.error('Failed to get user memories:', error);
    return { memories: [] };
  }
}
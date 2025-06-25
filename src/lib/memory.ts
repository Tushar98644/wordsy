import MemoryClient, {
    Message,
    MemoryOptions,
    SearchOptions,
    Memory,
  } from 'mem0ai';
  
  const mem0 = new MemoryClient({ apiKey: process.env.MEM0_API_KEY as string });
  
  export async function storeConversation(
    userId: string,
    messages: Message[]
  ): Promise<string[]> {
    const opts: MemoryOptions = {
      user_id: userId,
      metadata: { type: 'conversation' },
    };
  
    const memories: Memory[] = await mem0.add(messages, opts);
    return memories.map(mem => mem.id);
  }
  
  export async function recallConversation(
    userId: string,
    query: string
  ): Promise<string[]> {
    const opts: SearchOptions = {
      user_id: userId,
      filters: {
        AND: [
          { user_id: userId },
          { 'metadata.type': 'conversation' },
        ],
      },
      version: 'v2',
      limit: 3,
    };
  
    const result = await mem0.search(query, opts);
    return result.map(r => r.data?.memory as string);
  }
  
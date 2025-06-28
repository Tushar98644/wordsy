import { NextResponse } from "next/server";
import { memoryClient } from "@/lib/memory/client";
import { shouldStoreMessage } from "@/utils/memory";
import type { GetContextParams, StoreParams } from "@/types/memory";

export async function getContext(userId: string, params: GetContextParams) {
  const { query, limit = 20 } = params;
  try {
    const memories = await memoryClient.search(query, {
      limit,
      user_id: userId,
      version: 'v2'
    });
    const context = memories
      .map(m => m.memory)
      .join('\n')
      .substring(0, 1500);

    return NextResponse.json({ context, memoriesFound: memories.length });
  } catch (error) {
    console.error('Memory search failed:', error);
    return NextResponse.json({ context: '', memoriesFound: 0 });
  }
}

export async function storeMemory(userId: string, params: StoreParams) {
  const { content, metadata } = params;

  if (!shouldStoreMessage(content)) {
    return NextResponse.json({ stored: false, reason: 'Not meaningful enough' });
  }

  try {
    const memory = await memoryClient.add([
      {
        content: content,
        role: metadata?.role || 'user',
      }
    ], {
      timestamp: Math.floor(Date.now() / 1000),
      user_id: userId,
      version: 'v2'
    });

    return NextResponse.json({ stored: true, memory });
  } catch (error) {
    console.error('Memory storage failed:', error);
    return NextResponse.json({
      stored: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
}

export async function getUserMemories(userId: string) {
  try {
    const memories = await memoryClient.getAll({
      user_id: userId,
      version: 'v2',
      limit: 100
    });
    return NextResponse.json({ memories });
  } catch (error) {
    console.error('Failed to get user memories:', error);
    return NextResponse.json({ memories: [] });
  }
}
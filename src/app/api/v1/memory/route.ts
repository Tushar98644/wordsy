import { NextRequest, NextResponse } from "next/server";
import { memoryClient } from "@/lib/memory/client";

export async function POST(request: NextRequest) {
    try {
        const { action, userId, ...params } = await request.json();

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        switch (action) {
            case 'getContext': {
                const { query, limit = 3 } = params;
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

            case 'store': {
                const { content, metadata } = params;

                if (!shouldStoreMessage(content)) {
                    console.log('Not storing message:', content);
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

                    console.log('Memory stored:', memory);

                    return NextResponse.json({ stored: true, memory });
                } catch (error) {
                    console.error('Memory storage failed:', error);
                    return NextResponse.json({
                        stored: false,
                        error: error instanceof Error ? error.message : 'Unknown error'
                    });
                }
            }

            case 'getUserMemories': {
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

            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error) {
        console.error('Memory API error:', error);
        return NextResponse.json({ error: "Memory operation failed" }, { status: 500 });
    }
}

function shouldStoreMessage(content: string): boolean {
    if (!content || content.length < 15) return false;

    const genericPatterns = [
        /^(hi|hello|thanks|ok|yes|no|sure)$/i,
        /^(what|how|why|when|where|do)\s*\?*$/i,
    ];

    if (genericPatterns.some(pattern => pattern.test(content.trim()))) {
        return false;
    }

    const meaningfulPatterns = [
        /my name is|i'm |i am |call me/i,
        /i like|i love|i prefer|i enjoy/i,
        /my hobby|my hobbies|i play|i watch/i,
        /i work|my job|i study/i,
        /remember|important|note that/i,
        /my birthday|i live|i'm from/i,
    ];

    return meaningfulPatterns.some(pattern => pattern.test(content)) || content.length > 50;
}
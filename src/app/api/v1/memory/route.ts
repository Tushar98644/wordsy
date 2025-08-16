import { memoryService } from "@/services/memoryService";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    try {
        const { action, userId, ...params } = await request.json();

        if (!userId) {
            return NextResponse.json({ error: "User ID required" }, { status: 400 });
        }

        switch (action) {
            case 'getContext': 
              return await memoryService.getContext(userId, params);

            case 'store': 
              return await memoryService.storeMemory(userId, params);

            case 'getUserMemories': 
              return await memoryService.getUserMemories(userId);

            default:
                return NextResponse.json({ error: "Invalid action" }, { status: 400 });
        }
    } catch (error) {
        console.error('Memory API error:', error);
        return NextResponse.json({ error: "Memory operation failed" }, { status: 500 });
    }
}
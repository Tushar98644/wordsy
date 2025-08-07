import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/db/connect";
import { Chat } from "@/db/models/chat";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const userId = searchParams.get("userId");

    if (!userId) {
      return NextResponse.json(
        { error: "User ID is required" },
        { status: 400 }
      );
    }

    const chats = await Chat.find({ userId })
      .select("_id title createdAt updatedAt")
      .sort({ updatedAt: -1 })
      .limit(50);

    return NextResponse.json({ chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    return NextResponse.json(
      { error: "Failed to fetch chats" },
      { status: 500 }
    );
  }
}

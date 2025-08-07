import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/db/connect";
import { Chat } from "@/models/chat";

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { title, userId } = await request.json();

    if (!userId || !title) {
      return NextResponse.json(
        { error: "User ID and title are required" },
        { status: 400 }
      );
    }

    const chat = new Chat({
      title,
      userId,
      messages: [],
    });

    await chat.save();

    return NextResponse.json({
      chatId: chat._id.toString(),
      title: chat.title,
      createdAt: chat.createdAt,
    });
  } catch (error) {
    console.error("Error creating chat:", error);
    return NextResponse.json(
      { error: "Failed to create chat" },
      { status: 500 }
    );
  }
}

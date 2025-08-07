import { NextRequest, NextResponse } from "next/server";
import { Chat } from "@/db/models/chat";
import { connectToDB } from "@/db/connect";

export async function GET(request: NextRequest) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    return NextResponse.json(chat.messages);
  } catch (error) {
    console.error("Error fetching messages:", error);
    return NextResponse.json(
      { error: "Failed to fetch messages" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    await connectToDB();

    const { message } = await request.json();

    if (!message || !message.id || !message.role || !message.content) {
      return NextResponse.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }

    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    chat.messages.push({
      ...message,
      timestamp: new Date(),
    });

    await chat.save();

    return NextResponse.json({ message: "Message added successfully" });
  } catch (error) {
    console.error("Error adding message:", error);
    return NextResponse.json(
      { error: "Failed to add message" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    await connectToDB();

    const { messageId, content } = await request.json();

    const { searchParams } = new URL(request.url);
    const chatId = searchParams.get("chatId");
    const chat = await Chat.findById(chatId);

    if (!chat) {
      return NextResponse.json({ error: "Chat not found" }, { status: 404 });
    }

    const messageIndex = chat.messages.findIndex(
      (msg: { id: any }) => msg.id === messageId
    );

    if (messageIndex === -1) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }

    chat.messages[messageIndex].content = content;
    await chat.save();

    return NextResponse.json({ message: "Message updated successfully" });
  } catch (error) {
    console.error("Error updating message:", error);
    return NextResponse.json(
      { error: "Failed to update message" },
      { status: 500 }
    );
  }
}

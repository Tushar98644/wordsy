import { NextRequest, NextResponse } from 'next/server';
import { Chat } from '@/models/chat';
import { connectToDB } from '@/lib/db';

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    
    const { message } = await request.json();
    
    if (!message || !message.id || !message.role || !message.content) {
      return NextResponse.json(
        { error: 'Invalid message format' },
        { status: 400 }
      );
    }

    const chat = await Chat.findById(params.id);
    
    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    chat.messages.push({
      ...message,
      timestamp: new Date()
    });

    await chat.save();

    return NextResponse.json({ message: 'Message added successfully' });
  } catch (error) {
    console.error('Error adding message:', error);
    return NextResponse.json(
      { error: 'Failed to add message' },
      { status: 500 }
    );
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connectToDB();
    
    const { messageId, content } = await request.json();
    
    const chat = await Chat.findById(params.id);
    
    if (!chat) {
      return NextResponse.json(
        { error: 'Chat not found' },
        { status: 404 }
      );
    }

    const messageIndex = chat.messages.findIndex((msg: { id: any }) => msg.id === messageId);
    
    if (messageIndex === -1) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    chat.messages[messageIndex].content = content;
    await chat.save();

    return NextResponse.json({ message: 'Message updated successfully' });
  } catch (error) {
    console.error('Error updating message:', error);
    return NextResponse.json(
      { error: 'Failed to update message' },
      { status: 500 }
    );
  }
}
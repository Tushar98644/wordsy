import { Thread } from "@/db/models/thread";
import { connectToDB } from "@/db/connect";

type RouteParams = { params: Promise<{ id: string }> }

export async function POST(request: Request, { params }: RouteParams) {
  try {
    await connectToDB();
    
    const { id: threadId } = await params;

    const { message } = await request.json();

    if (!message || !message.role || !message.content) {
      return Response.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }
    
    const thread = await Thread.findById(threadId);
    if (!thread) {
      return Response.json({ error: "Thread not found" }, { status: 404 });
    }
    
    thread.messages.push({ ...message });
    await thread.save();

    return Response.json({ message: "Message added successfully" });
  } catch (error) {
    console.error("Error adding message:", error);
    return Response.json({ error: "Failed to add message" }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    await connectToDB();

    const { messageId, content } = await request.json();

    const { searchParams } = new URL(request.url);
    const threadId = searchParams.get("threadId");

    const thread = await Thread.findById(threadId);
    if (!Thread) {
      return Response.json({ error: "Thread not found" }, { status: 404 });
    }

    const m = thread.messages.id(messageId);
    if (!m) {
      return Response.json({ error: "Message not found" }, { status: 404 });
    }

    m.content = content;
    await thread.save();

    return Response.json({ message: "Message updated successfully" });
  } catch (error) {
    console.error("Error updating message:", error);
    return Response.json(
      { error: "Failed to update message" },
      { status: 500 }
    );
  }
}
import { Thread } from "@/db/models/thread";
import { connectToDB } from "@/db/connect";

type RouteParams = { params: Promise<{ id: string }> }

export async function POST(request: Request, { params }: RouteParams) {
  console.log("📨 [MESSAGES API] POST request received");
  
  try {
    await connectToDB();
    console.log("✅ [MESSAGES API] Database connected");
    
    const { id: threadId } = await params;
    console.log("🔍 [MESSAGES API] Thread ID:", threadId);

    const body = await request.json();
    console.log("📥 [MESSAGES API] Request body:", JSON.stringify(body, null, 2));
    
    const { message } = body;
    console.log("💬 [MESSAGES API] Extracted message:", JSON.stringify(message, null, 2));

    if (!message || !message.role || !message.content) {
      console.log("❌ [MESSAGES API] Invalid message format");
      console.log("   - message exists:", !!message);
      console.log("   - role exists:", !!message?.role);
      console.log("   - content exists:", !!message?.content);
      return Response.json(
        { error: "Invalid message format" },
        { status: 400 }
      );
    }
    
    console.log("🔍 [MESSAGES API] Looking for thread with ID:", threadId);
    const thread = await Thread.findById(threadId);
    
    if (!thread) {
      console.log("❌ [MESSAGES API] Thread not found for ID:", threadId);
      return Response.json({ error: "Thread not found" }, { status: 404 });
    }
    
    console.log("✅ [MESSAGES API] Thread found:", {
      id: thread._id,
      title: thread.title,
      currentMessageCount: thread.messages?.length || 0
    });
    
    console.log("💾 [MESSAGES API] Adding message to thread...");
    thread.messages.push({ ...message });
    
    console.log("💾 [MESSAGES API] Saving thread...");
    await thread.save();
    
    console.log("✅ [MESSAGES API] Message saved successfully! New message count:", thread.messages.length);

    return Response.json({ 
      message: "Message added successfully",
      messageCount: thread.messages.length 
    });
    
  } catch (error) {
    console.error("💥 [MESSAGES API] Error adding message:", error);
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
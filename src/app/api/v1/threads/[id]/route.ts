import { connectToDB } from "@/db/connect";
import { Thread } from "@/db/models/thread";
import mongoose, { Types } from "mongoose";

type RouteParams = { params: Promise<{ id: string }> };

export async function GET(request: Request, { params }: RouteParams) {
  try {
    await connectToDB();

    const { id: threadId } = await params;

    if (!threadId) {
      return Response.json({ error: "Invalid thread id" }, { status: 400 });
    }

    const thread = await Thread.findById(threadId);
    if (!thread) {
      return Response.json({ error: "Thread not found" }, { status: 404 });
    }

    return Response.json(thread);
  } catch (error) {
    console.error("Error fetching thread:", error);
    return Response.json({ error: "Failed to fetch thread" }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: RouteParams) {
  try {
    await connectToDB();

    const { id: threadId } = await params;

    if (!threadId || !Types.ObjectId.isValid(threadId)) {
      return Response.json({ error: "Invalid thread id" }, { status: 400 });
    }

    const body = await request.json();
    const title = body?.title?.trim();

    if (!title) {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const thread = await Thread.findByIdAndUpdate(threadId, { title }, { new: true });
    
    if (!thread) {
      return Response.json({ error: "Thread not found" }, { status: 404 });
    }

    return Response.json(thread, { status: 200 });
  } catch (error) {
    console.error("Error updating thread:", error);
    return Response.json({ error: "Failed to update thread" }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    await connectToDB();

    const { id: threadId } = await params;
    console.log(`[THREADS API] Deleting thread ${threadId}`);

    if (!threadId || !Types.ObjectId.isValid(threadId)) {
      return Response.json({ error: "Invalid thread id" }, { status: 400 });
    }

    const thread = await Thread.findByIdAndDelete(threadId);
    if (!thread) {
      return Response.json({ error: "Thread not found" }, { status: 404 });
    }

    return Response.json({
      data: thread,
      message: "Thread deleted successfully",
      status: 200
    });
  } catch (error) {
    console.error("Error deleting thread:", error);
    return Response.json({ error: "Failed to delete thread" }, { status: 500 });
  }
}
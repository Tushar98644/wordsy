import { connectToDB } from "@/db/connect";
import { Thread } from "@/db/models/thread";


export async function GET(request: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    const thread = await Thread.findById(id);

    if (!thread) {
      return Response.json({ error: "Thread not found" }, { status: 404 });
    }

    return Response.json({ thread });
  } catch (error) {
    console.error("Error fetching thread:", error);
    return Response.json({ error: "Failed to fetch thread" }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");
    
    if (!id) {
      return Response.json({ error: "Thread ID is required" }, { status: 400 });
    }

    const { title } = await request.json();

    if (!title || title.trim() === "") {
      return Response.json({ error: "Title is required" }, { status: 400 });
    }

    const thread = await Thread.findByIdAndUpdate(id, { title }, { new: true });

    if (!thread) {
      return Response.json({ error: "Thread not found" }, { status: 404 });
    }

    return Response.json({ thread });
  } catch (error) {
    console.error("Error updating thread:", error);
    return Response.json({ error: "Failed to update thread" }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDB();

    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (!id) {
      return Response.json({ error: "Thread ID is required" }, { status: 400 });
    }

    const thread = await Thread.findByIdAndDelete(id);

    if (!thread) {
      return Response.json({ error: "Thread not found" }, { status: 404 });
    }

    return Response.json({ message: "Thread deleted successfully" });
  } catch (error) {
    console.error("Error deleting thread:", error);
    return Response.json({ error: "Failed to delete thread" }, { status: 500 });
  }
}
import { auth } from "@/config/auth/server";
import { connectToDB } from "@/db/connect";
import { Thread } from "@/db/models/thread";
import { headers } from "next/headers";

export async function GET(request: Request) {
  try {
    await connectToDB();
    
    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) { return Response.json({ error: "Unauthorized" },{ status: 401 })}

    const userEmail = session?.user?.email;

    if (!userEmail) {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }
    
    const threads = await Thread.find({ userEmail })
      .sort({ updatedAt: -1 })
      .limit(50);

    console.log(`[THREADS] Fetched ${threads.length} threads for user ${userEmail}`);
    return Response.json(threads);
  } catch (error) {
    console.error("Error fetching thread:", error);
    return Response.json(
      { error: "Failed to fetch thread" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();

    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) { return Response.json({ error: "Unauthorized" },{ status: 401 })}

    const userEmail = session?.user?.email;

    const { title } = await request.json();
    if (!title || !userEmail) {
      return Response.json(
        { error: "Title and user email are required" },
        { status: 400 }
      );
    }

    const thread = await Thread.create({ title, userEmail });
   
    return Response.json(thread);
  } catch (error) {
    console.error("Error creating thread:", error);
    return Response.json(
      { error: "Failed to create thread" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    await connectToDB();

    const session = await auth.api.getSession({
      headers: await headers()
    });

    if (!session) { return Response.json({ error: "Unauthorized" },{ status: 401 })}

    const userEmail = session?.user?.email;

    if (!userEmail) {
      return Response.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const threads = await Thread.deleteMany({ userEmail });

    return Response.json({ message: "Threads deleted successfully" });
  } catch (error) {
    console.error("Error deleting threads:", error);
    return Response.json(
      { error: "Failed to delete threads" },
      { status: 500 }
    );
  }
}
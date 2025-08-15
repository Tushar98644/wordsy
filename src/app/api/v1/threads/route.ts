import { NextRequest, NextResponse } from "next/server";
import { connectToDB } from "@/db/connect";
import { Thread } from "@/db/models/thread";

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
    
    const threads = await Thread.find({ userId })
      .select("_id title createdAt updatedAt")
      .sort({ updatedAt: -1 })
      .limit(50);

    console.log(`[THREADS] Fetched ${threads.length} threads for user ${userId}`);
    return NextResponse.json(threads);
  } catch (error) {
    console.error("Error fetching thread:", error);
    return NextResponse.json(
      { error: "Failed to fetch thread" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    await connectToDB();

    const { title, userId } = await request.json();
    if (!title || !userId) {
      return Response.json(
        { error: "Title and user ID are required" },
        { status: 400 }
      );
    }

    const thread = await Thread.create({ title, userId });
   
    return Response.json({ thread });
  } catch (error) {
    console.error("Error creating thread:", error);
    return Response.json(
      { error: "Failed to create thread" },
      { status: 500 }
    );
  }
}
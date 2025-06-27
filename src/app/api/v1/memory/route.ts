// import { NextRequest, NextResponse } from "next/server";
// import { MemoryClient } from "mem0ai";

// const mem0 = new MemoryClient({ apiKey: process.env.MEM0_API_KEY! });

// export async function POST(req: NextRequest) {
//   const { userId, messages } = await req.json();
//   const memories = await mem0.add(messages, {
//     user_id: userId,
//     metadata: { type: "conversation" },
//   });
//   const ids = memories.map(m => m.id);
//   return NextResponse.json({ ids });
// }

export async function POST(){};

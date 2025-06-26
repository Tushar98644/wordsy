// import { NextRequest, NextResponse } from "next/server";
// import { MemoryClient } from "mem0ai";

// const mem0 = new MemoryClient({ apiKey: process.env.MEM0_API_KEY! });

// export async function POST(req: NextRequest) {
//   const { userId, query } = await req.json();
//   const results = await mem0.search(query, {
//     filters: {
//       AND: [
//         { user_id: userId },
//         { "metadata.type": "conversation" }
//       ]
//     },
//     top_k: 3,
//     version: "v2",
//   });
//   const memories = results.map(r => r.memory);
//   return NextResponse.json({ memories });
// }

export async function POST() {};

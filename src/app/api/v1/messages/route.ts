import { connectToDB } from "@/db/connect";
import { Message } from "@/db/models/message";

export async function GET(request: Request) {
    try {
        const searchParams = new URL(request.url).searchParams;
        const threadId = searchParams.get("threadId");

        if (!threadId) {
            return Response.json({ error: "Invalid thread id" }, { status: 400 });
        }

        await connectToDB();

        const messages = await Message.find({ threadId });
        return Response.json(messages);
        
    } catch (error) {
        console.error("Error fetching messages:", error);
        return Response.json({ error: "Failed to fetch messages" }, { status: 500 });
    }
}
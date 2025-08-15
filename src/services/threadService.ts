import { Thread } from "@/types/thread";
import axios from "axios";

class ThreadService {
    public async getAllThreads(userEmail: string): Promise<Thread[]> {
        const res = await axios.get('/api/v1/threads', { params: { userEmail } });
        return res.data;
    }

    public async deleteAllThreads(userEmail: string) {
        const res = await axios.delete('/api/v1/threads', { params: { userEmail } });
        return res.data;
    }

    public async deleteThread(threadId: string) {
        const res = await axios.delete(`/api/v1/threads/${threadId}`);
        return res.data;
    }
}

export const threadService = new ThreadService();
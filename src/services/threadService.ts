import { Thread } from "@/types/thread";
import axios from "axios";

class ThreadService {
    public async getAllThreads(): Promise<Thread[]> {
        const res = await axios.get('/api/v1/threads');
        return res.data;
    }

    public async getThread(threadId:any): Promise<Thread> {
        const res = await axios.get(`/api/v1/threads/${threadId}`);
        return res.data;
    }

    public async deleteAllThreads() {
        const res = await axios.delete('/api/v1/threads');
        return res.data;
    }

    public async deleteThread(threadId: string) {
        const res = await axios.delete(`/api/v1/threads/${threadId}`);
        return res.data;
    }
}

export const threadService = new ThreadService();
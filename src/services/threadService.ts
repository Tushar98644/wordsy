import axios from "axios";

class ThreadService {
    public async getAllThreads(userId: string) {
        const res = await axios.get('/api/v1/threads', { params: { userId } });
        return res.data;
    }
}

export const threadService = new ThreadService();
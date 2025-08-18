import axios from "axios";

class MessageService {
    public async getMessages(threadId: string) {
        const res = await axios.get('/api/v1/messages', { params: { threadId } });
        return res.data;
    }
}

export const messageService = new MessageService();
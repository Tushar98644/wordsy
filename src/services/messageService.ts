import axios from "axios";

class MessageService {
    public async sendMessage(threadId: string, message: any) {
        const res = await axios.post(`/api/v1/threads/${threadId}/messages`, { message });
        return res.data;
    }
}

export const messageService = new MessageService();
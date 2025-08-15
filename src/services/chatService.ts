import axios from "axios";

class ChatService {
    public async getAllThreads() {
        const res = await axios.get('/api/v1/chats');
        return res.data;
    }
}

export const chatService = new ChatService();
import axios from "axios";
import { Chat } from "@/app/types";

export const chatApi = {
    async fetchChats(userId: string): Promise<Chat[]> {
        try {
            const res = await axios.get(`/api/v1/chats/list?userId=${userId}`);
            return res.data.chats || [];
        } catch (err) {
            console.error("Error fetching chats:", err);
            throw err;
        }
    },

    async fetchMessages(chatId: string) {
        try {
            const res = await axios.get(`/api/v1/chats/messages?chatId=${chatId}`);
            return res.data;
        } catch (err) {
            console.error("Error loading chat messages:", err);
            throw err;
        }
    },

    async renameChat(chatId: string, title: string): Promise<void> {
        try {
            await axios.put(`/api/v1/chats?id=${chatId}`, { title });
        } catch (err) {
            console.error("Error renaming chat:", err);
            throw err;
        }
    },

    async deleteChat(chatId: string): Promise<void> {
        try {
            await axios.delete(`/api/v1/chats?id=${chatId}`);
        } catch (err) {
            console.error("Error deleting chat:", err);
            throw err;
        }
    }
};
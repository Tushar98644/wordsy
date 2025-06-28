import { useEffect, useState } from "react";
import { Chat } from "@/types";
import { chatApi } from "@/utils/chatApi";

export const useChats = (userId?: string) => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchChats = async () => {
        if (!userId) return;

        try {
            setLoading(true);
            setError(null);
            const fetchedChats = await chatApi.fetchChats(userId);
            setChats(fetchedChats);
        } catch (err) {
            setError("Failed to fetch chats");
        } finally {
            setLoading(false);
        }
    };

    const addChat = (chat: Chat) => {
        setChats(prev => [...prev, chat]);
    };

    const updateChat = (chatId: string, updates: Partial<Chat>) => {
        setChats(prev => prev.map(chat =>
            chat._id === chatId ? { ...chat, ...updates } : chat
        ));
    };

    const removeChat = (chatId: string) => {
        setChats(prev => prev.filter(chat => chat._id !== chatId));
    };

    useEffect(() => {
        fetchChats();
    }, [userId]);

    return {
        chats,
        loading,
        error,
        addChat,
        updateChat,
        removeChat,
        refetch: fetchChats
    };
};
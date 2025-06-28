"use client";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";
import BottomSection from "./bottom-section";
import TopSection from "./top-section";

import { SidebarProps } from "@/app/types";
import { useChats } from "@/hooks";
import { chatApi } from "@/utils/chatApi";
import { QuickActions } from "./quick-actions";
import { ChatList } from "./chat-list";

export const Sidebar = ({ resetChat, setMessages, setChatId }: SidebarProps) => {
    const { user } = useUser();
    const { chats, updateChat, removeChat } = useChats(user?.id);
    const [selectedChatId, setSelectedChatId] = useState<string | null>(null);

    const handleNewChat = () => {
        setMessages([]);
        setSelectedChatId(null);
        resetChat();
    };

    const handleChatSelect = async (chatId: string) => {
        setSelectedChatId(chatId);
        resetChat();
        setChatId(chatId);

        try {
            const messages = await chatApi.fetchMessages(chatId);
            setMessages(messages);
        } catch (err) {
            console.error("Error loading chat:", err);
        }
    };

    const handleChatRename = async (chatId: string, newTitle: string) => {
        try {
            await chatApi.renameChat(chatId, newTitle);
            updateChat(chatId, { title: newTitle });
        } catch (err) {
            console.error("Error renaming chat:", err);
        }
    };

    const handleChatDelete = async (chatId: string) => {
        try {
            await chatApi.deleteChat(chatId);
            removeChat(chatId);
            
            if (selectedChatId === chatId) {
                handleNewChat();
            }
        } catch (err) {
            console.error("Error deleting chat:", err);
        }
    };

    return (
        <div className="w-[260px] bg-[#171717] flex flex-col border-r border-[#2f2f2f]">
            <TopSection handleNewChat={handleNewChat} />

            <div className="flex-1 py-2 p-1 overflow-y-auto">
                <QuickActions />
                
                <h3 className="text-sm font-medium text-gray-300 mb-2 px-3 tracking-wider">
                    Chats
                </h3>
                
                <ChatList
                    chats={chats}
                    selectedChatId={selectedChatId}
                    onChatSelect={handleChatSelect}
                    onChatRename={handleChatRename}
                    onChatDelete={handleChatDelete}
                />
            </div>

            <BottomSection />
        </div>
    );
};
"use client";

import { GptsIcon } from "@/components/icons/GptsIcon";
import { SoraIcon } from "@/components/icons/SoraIcon";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";
import BottomSection from "./sidebar/bottom-section";
import TopSection from "./sidebar/top-section";
import axios from "axios";

type SidebarProps = {
    resetChat: () => void;
    setMessages: (messages: any[]) => void;
    setChatId: (chatId: string) => void;
};

const Sidebar = ({
    resetChat,
    setMessages,
    setChatId,
}: SidebarProps) => {
    const { user } = useUser();
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [chats, setChats] = useState<{ _id: string, title: string }[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            if (!user?.id) return;

            try {
                const res = await axios.get(`/api/v1/chats/list?userId=${user?.id}`);
                setChats(res.data.chats || []);
            } catch (err) {
                console.error("Error fetching chats:", err);
            }
        };
        fetchChats();
    }, [user?.id]);

    const handleNewChat = async () => {
        setMessages([]);
        setSelectedChat(null);
        resetChat();
    };

    const handleChatSelect = async (chatId: string) => {
        setSelectedChat(chatId);
        resetChat();
        setChatId(chatId);

        try {
            const res = await axios.get(`/api/v1/chats/messages?chatId=${chatId}`);
            setMessages(res.data);
        } catch (err) {
            console.error("Error creating chat:", err);
        }
    };

    return (
        <div className="w-[260px] bg-[#171717] flex flex-col border-r border-[#2f2f2f]">
            <TopSection handleNewChat={handleNewChat} />

            {/* Chat history */}
            <div className="flex-1 py-2 p-1 overflow-y-auto">
                <div className="p-1 space-y-0 mb-6">
                    <Button
                        variant="default"
                        className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg h-9"
                    >
                        <SoraIcon className="size-5 mr-0" />
                        Sora
                    </Button>

                    <Button
                        variant="default"
                        className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg h-9"
                    >
                        <GptsIcon className="size-5 mr-0" />
                        GPTs
                    </Button>
                </div>
                <h3 className="text-sm font-medium text-gray-300 mb-2 px-3 tracking-wider">
                    Chats
                </h3>
                <div className="px-1space-y-0 mx-1">
                    {chats.length > 0 ? (
                        chats.map((chat, index) => (
                            <button
                                key={index}
                                onClick={() => handleChatSelect(chat._id)}
                                className={`w-full text-left text-sm text-white hover:bg-[#2f2f2f] rounded-lg p-2 truncate transition-colors ${selectedChat === chat._id ? "bg-[#2f2f2f]" : ""}`}
                            >
                                {chat.title}
                            </button>
                        ))
                    ) : (
                        <p className="text-gray-400 text-sm px-2">No chats yet</p>
                    )}
                </div>
            </div>
            <BottomSection />
        </div>
    );
};

export default Sidebar;

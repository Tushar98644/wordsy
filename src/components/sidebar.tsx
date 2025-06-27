"use client";

import { GptsIcon } from "@/components/icons/GptsIcon";
import { LibraryIcon } from "@/components/icons/LibraryIcon";
import { NewChatIcon } from "@/components/icons/NewChatIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import { SoraIcon } from "@/components/icons/SoraIcon";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { useUser } from "@clerk/nextjs";

type SidebarProps = {
    setMessages: (messages: any[]) => void;
    setInput: (input: string) => void;
    setFile: (file: File | null) => void;
    setFileUrl: (fileUrl: string | null) => void;
};

const Sidebar = ({
    setMessages,
    setInput,
    setFile,
    setFileUrl,
}: SidebarProps) => {
    const { user } = useUser();
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const [chats, setChats] = useState<{ _id: string, title: string }[]>([]);

    useEffect(() => {
        const fetchChats = async () => {
            if (!user?.id) return;

            try {
                const res = await fetch(`/api/v1/chats/list?userId=${user?.id}`);
                const data = await res.json();
                setChats(data.chats || []);
            } catch (err) {
                console.error("Error fetching chats:", err);
            }
        };
        fetchChats();
    }, [user?.id]);

    const handleNewChat = () => {
        setMessages([]);
        setSelectedChat(null);
        setInput("");
        setFile(null);
        setFileUrl(null);
    };

    const handleChatSelect = async (chatId: string) => {
        setSelectedChat(chatId);
        setInput("");
        setFile(null);
        setFileUrl(null);

        try {
            const res = await fetch(`/api/v1/chats/${chatId}/messages`);
            const msgs = await res.json();
            setMessages(msgs);
        } catch (error) {
            console.error("Error loading chat messages:", error);
        }
    };

    return (
        <div className="w-[260px] bg-[#171717] flex flex-col border-r border-[#2f2f2f]">
            {/* Top section */}
            <div className="p-1 space-y-0 px-2">
                {/* ChatGPT logo */}
                <div className="flex items-center gap-3 px-3 py-3 pb-6">
                    <LogoIcon className="size-6 text-white" />
                </div>

                <Button
                    variant="default"
                    className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg h-9"
                    onClick={handleNewChat}
                >
                    <NewChatIcon className="size-5 mr-0" />
                    New chat
                </Button>

                <Button
                    variant="default"
                    className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg h-9"
                >
                    <SearchIcon className="size-5 mr-0" />
                    Search chats
                </Button>

                <Button
                    variant="default"
                    className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg h-9"
                >
                    <LibraryIcon className="size-5 mr-0" />
                    Library
                </Button>
            </div>

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
                <div className="space-y-0 mx-1">
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

            {/* Bottom section */}
            <div className="p-3 border-t border-[#2f2f2f]">
                <Button
                    variant="default"
                    className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg p-3"
                >
                    <SettingsIcon className="size-5 mr-0" />
                    <div className="flex flex-col items-start">
                        <span className="text-sm">Upgrade plan</span>
                        <span className="text-xs text-white">
                            More access to the best models
                        </span>
                    </div>
                </Button>
            </div>
        </div>
    );
};

export default Sidebar;

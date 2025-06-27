"use client";

import { GptsIcon } from "@/components/icons/GptsIcon";
import { LibraryIcon } from "@/components/icons/LibraryIcon";
import { NewChatIcon } from "@/components/icons/NewChatIcon";
import { SearchIcon } from "@/components/icons/SearchIcon";
import { SettingsIcon } from "@/components/icons/SettingsIcon";
import { SoraIcon } from "@/components/icons/SoraIcon";
import { LogoIcon } from "@/components/icons/LogoIcon";
import { Button } from "@/components/ui/button";
import { useState } from "react";

type SidebarProps = {
    setMessages: (messages: any[]) => void;
    setInput: (input: string) => void;
    setFile: (file: File | null) => void;
    setFileUrl: (fileUrl: string | null) => void;
};

const Sidebar = ({ setMessages, setInput, setFile, setFileUrl }: SidebarProps) => {

    const [selectedChat, setSelectedChat] = useState<string | null>(null);

    const chatHistory = [
        "React infinite re-render fix",
        "Next.js HTTP methods fix",
        "Application Confirmation and Ca...",
        "Stack Elements Vertically",
        "Mobile site blocker",
        "Backend Language Comparison",
        "Catrobat Sunbird UCI Summary",
        "ChatGPT Model Type",
        "ChatGPT Model Type 2",
        "ChatGPT Model Type 3",
        "ChatGPT Model Type 4",
        "ChatGPT Model Type 5",
    ];

    const handleNewChat = () => {
        setMessages([]);
        setSelectedChat(null);
        setInput('');
        setFile(null);
        setFileUrl(null);
    };

    const handleChatSelect = async (chat: string) => {
        setSelectedChat(chat);
        setMessages([]);
        setInput('');
        setFile(null);
        setFileUrl(null);

        try {
        } catch (error) {
            console.error('Error recalling conversation:', error);
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
                <h3 className="text-sm font-medium text-gray-300 mb-2 px-3 tracking-wider">Chats</h3>
                <div className="space-y-0 mx-1">
                    {chatHistory.map((chat, index) => (
                        <button
                            key={index}
                            onClick={() => handleChatSelect(chat)}
                            className={`w-full text-left text-sm text-white hover:bg-[#2f2f2f] rounded-lg p-2.5 truncate transition-colors ${selectedChat === chat ? "bg-[#2f2f2f]" : ""
                                }`}
                        >
                            {chat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom section */}
            <div className="p-3 border-t border-[#2f2f2f]">
                <Button variant="default" className="w-full justify-start text-white hover:bg-[#2f2f2f] rounded-lg p-3">
                    <SettingsIcon className="size-5 mr-0" />
                    <div className="flex flex-col items-start">
                        <span className="text-sm">Upgrade plan</span>
                        <span className="text-xs text-white">More access to the best models</span>
                    </div>
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;
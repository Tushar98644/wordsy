"use client";

import { PenSquare, Search, Library, Sparkles, Grid3X3, Settings } from "lucide-react";
import { Button } from "./ui/button";
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
            <div className="p-3 space-y-1">
                {/* ChatGPT logo */}
                <div className="flex items-center gap-3 px-3 py-2">
                    <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                        <div className="w-4 h-4 bg-black rounded-full"></div>
                    </div>
                </div>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg h-11 px-3"
                    onClick={handleNewChat}
                >
                    <PenSquare className="w-4 h-4 mr-3" />
                    New chat
                </Button>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg h-11 px-3"
                >
                    <Search className="w-4 h-4 mr-3" />
                    Search chats
                </Button>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg h-11 px-3"
                >
                    <Library className="w-4 h-4 mr-3" />
                    Library
                </Button>
            </div>

            <div className="border-t border-[#2f2f2f] p-3 space-y-1">
                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg h-11 px-3"
                >
                    <Sparkles className="w-4 h-4 mr-3" />
                    Sora
                </Button>

                <Button
                    variant="ghost"
                    className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg h-11 px-3"
                >
                    <Grid3X3 className="w-4 h-4 mr-3" />
                    GPTs
                </Button>
            </div>

            {/* Chat history */}
            <div className="flex-1 p-3 overflow-y-auto">
                <h3 className="text-xs font-medium text-gray-500 mb-2 px-3 uppercase tracking-wider">Chats</h3>
                <div className="space-y-1">
                    {chatHistory.map((chat, index) => (
                        <button
                            key={index}
                            onClick={() => handleChatSelect(chat)}
                            className={`w-full text-left text-sm text-gray-300 hover:bg-[#2f2f2f] rounded-lg p-3 truncate transition-colors ${selectedChat === chat ? "bg-[#2f2f2f]" : ""
                                }`}
                        >
                            {chat}
                        </button>
                    ))}
                </div>
            </div>

            {/* Bottom section */}
            <div className="p-3 border-t border-[#2f2f2f]">
                <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg p-3">
                    <Settings className="w-4 h-4 mr-3" />
                    <div className="flex flex-col items-start">
                        <span className="text-sm">Upgrade plan</span>
                        <span className="text-xs text-gray-500">More access to the best models</span>
                    </div>
                </Button>
            </div>
        </div>
    );
}

export default Sidebar;
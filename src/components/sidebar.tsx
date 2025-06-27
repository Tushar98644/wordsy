"use client";

import { GptsIcon } from "./icons/GptsIcon";
import { LibraryIcon } from "./icons/LibraryIcon";
import { NewChatIcon } from "./icons/NewChatIcon";
import { SearchIcon } from "./icons/SearchIcon";
import { SoraIcon } from "./icons/SoraIcon";
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
                    <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
                        <div className="w-4 h-4 bg-black rounded-full"></div>
                    </div>
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
                <div className="space-y-1">
                    {chatHistory.map((chat, index) => (
                        <button
                            key={index}
                            onClick={() => handleChatSelect(chat)}
                            className={`w-full text-left text-sm text-white hover:bg-[#2f2f2f] rounded-lg p-3 truncate transition-colors ${selectedChat === chat ? "bg-[#2f2f2f]" : ""
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
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className="icon" aria-hidden="true"><path d="M8.44824 8.218C8.52492 7.98941 8.84816 7.98938 8.9248 8.218L9.28809 9.30784C9.46326 9.83337 9.87587 10.2459 10.4014 10.4211L11.4912 10.7844C11.7205 10.8608 11.7205 11.1855 11.4912 11.2619L10.4014 11.6252C9.87585 11.8005 9.46327 12.213 9.28809 12.7385L8.9248 13.8283C8.84823 14.0572 8.52485 14.0571 8.44824 13.8283L8.08496 12.7385C7.90979 12.213 7.49715 11.8005 6.97168 11.6252L5.88184 11.2619C5.65258 11.1855 5.65258 10.8608 5.88184 10.7844L6.97168 10.4211C7.49712 10.2458 7.9098 9.83334 8.08496 9.30784L8.44824 8.218Z"></path><path d="M12.0723 6.10765C12.12 5.96436 12.3224 5.96436 12.3701 6.10765L12.5977 6.78831C12.7071 7.11676 12.9645 7.37506 13.293 7.4846L13.9746 7.71116C14.1177 7.75902 14.1177 7.96218 13.9746 8.00999L13.293 8.23655C12.9646 8.3461 12.7071 8.60442 12.5977 8.93284L12.3701 9.6135C12.3223 9.75664 12.12 9.7567 12.0723 9.6135L11.8457 8.93284C11.7362 8.60433 11.4779 8.34605 11.1494 8.23655L10.4688 8.00999C10.3255 7.96223 10.3255 7.75892 10.4688 7.71116L11.1494 7.4846C11.4779 7.37509 11.7362 7.11682 11.8457 6.78831L12.0723 6.10765Z"></path><path fill-rule="evenodd" clip-rule="evenodd" d="M9.00098 1.81761C9.6757 1.48574 10.4759 1.50965 11.1328 1.88889L16.459 4.96409L16.5869 5.04319C17.2117 5.46158 17.5908 6.16653 17.5908 6.92503V13.0754C17.5907 13.8339 17.2118 14.5389 16.5869 14.9573L16.459 15.0364L11.1328 18.1116C10.476 18.4908 9.67566 18.5146 9.00098 18.1828L8.86816 18.1116L3.54102 15.0364C2.8407 14.6318 2.40926 13.8842 2.40918 13.0754V6.92503C2.40918 6.11617 2.84064 5.36866 3.54102 4.96409L8.86816 1.88889L9.00098 1.81761ZM10.4678 3.04026C10.2149 2.89427 9.91027 2.8762 9.64453 2.98557L9.5332 3.04026L4.20605 6.11546C3.91705 6.28242 3.73926 6.59125 3.73926 6.92503V13.0754C3.73934 13.4091 3.91711 13.7181 4.20605 13.885L9.5332 16.9602L9.64453 17.0149C9.91024 17.1242 10.215 17.1061 10.4678 16.9602L15.7939 13.885L15.8975 13.8157C16.125 13.6402 16.2607 13.3673 16.2607 13.0754V6.92503C16.2607 6.63315 16.1249 6.36025 15.8975 6.18479L15.7939 6.11546L10.4678 3.04026Z"></path></svg>
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
"use client";
import { GptsIcon } from "@/components/icons/GptsIcon";
import { SoraIcon } from "@/components/icons/SoraIcon";
import { Button } from "@/components/ui/button";
import { useEffect, useState, useRef } from "react";
import { useUser } from "@clerk/nextjs";
import BottomSection from "./bottom-section";
import TopSection from "./top-section";
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
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isRenaming, setIsRenaming] = useState<string | null>(null);
    const [renameValue, setRenameValue] = useState("");
    const menuRef = useRef<HTMLDivElement>(null);

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

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setOpenMenuId(null);
                setIsRenaming(null);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

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

    const handleMenuToggle = (chatId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setOpenMenuId(openMenuId === chatId ? null : chatId);
        setIsRenaming(null);
    };

    const handleRename = (chatId: string, currentTitle: string, event: React.MouseEvent) => {
        event.stopPropagation();
        setIsRenaming(chatId);
        setRenameValue(currentTitle);
        setOpenMenuId(null);
    };

    const handleRenameSubmit = async (chatId: string) => {
        if (!renameValue.trim()) return;

        try {
            await axios.put(`/api/v1/chats?id=${chatId}`, {
                title: renameValue.trim()
            });
            
            setChats(chats.map(chat => 
                chat._id === chatId 
                    ? { ...chat, title: renameValue.trim() }
                    : chat
            ));
            
            setIsRenaming(null);
            setRenameValue("");
        } catch (err) {
            console.error("Error renaming chat:", err);
        }
    };

    const handleRenameCancel = () => {
        setIsRenaming(null);
        setRenameValue("");
    };

    const handleDelete = async (chatId: string, event: React.MouseEvent) => {
        event.stopPropagation();
        
        if (!confirm("Are you sure you want to delete this chat?")) return;

        try {
            await axios.delete(`/api/v1/chats?id=${chatId}`);
            setChats(chats.filter(chat => chat._id !== chatId));
            handleNewChat();
        } catch (err) {
            console.error("Error deleting chat:", err);
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
                <div className="px-1 space-y-0 mx-1">
                    {chats.length > 0 ? (
                        chats.map((chat, index) => (
                            <div
                                key={index}
                                className={`relative group w-full text-left text-sm text-white hover:bg-[#2f2f2f] rounded-lg transition-colors ${selectedChat === chat._id ? "bg-[#2f2f2f]" : ""}`}
                            >
                                {isRenaming === chat._id ? (
                                    <div className="p-2">
                                        <input
                                            type="text"
                                            value={renameValue}
                                            onChange={(e) => setRenameValue(e.target.value)}
                                            onKeyDown={(e) => {
                                                if (e.key === 'Enter') handleRenameSubmit(chat._id);
                                                if (e.key === 'Escape') handleRenameCancel();
                                            }}
                                            onBlur={() => handleRenameSubmit(chat._id)}
                                            className="w-full bg-[#2f2f2f] text-white border border-gray-500 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                                            autoFocus
                                        />
                                    </div>
                                ) : (
                                    <button
                                        onClick={() => handleChatSelect(chat._id)}
                                        className="w-full p-2 flex items-center justify-between"
                                    >
                                        <span className="truncate pr-2">{chat.title}</span>
                                        <button
                                            onClick={(e) => handleMenuToggle(chat._id, e)}
                                            className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#404040] rounded transition-opacity flex-shrink-0"
                                        >
                                            <svg
                                                width="16"
                                                height="16"
                                                viewBox="0 0 24 24"
                                                fill="none"
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="text-gray-400"
                                            >
                                                <circle cx="12" cy="5" r="2" fill="currentColor"/>
                                                <circle cx="12" cy="12" r="2" fill="currentColor"/>
                                                <circle cx="12" cy="19" r="2" fill="currentColor"/>
                                            </svg>
                                        </button>
                                    </button>
                                )}

                                {/* Dropdown Menu */}
                                {openMenuId === chat._id && (
                                    <div
                                        ref={menuRef}
                                        className="absolute right-2 top-full mt-1 bg-[#2f2f2f] border border-[#404040] rounded-lg shadow-lg z-50 min-w-[120px]"
                                    >
                                        <button
                                            onClick={(e) => handleRename(chat._id, chat.title, e)}
                                            className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#404040] rounded-t-lg transition-colors"
                                        >
                                            Rename
                                        </button>
                                        <button
                                            onClick={(e) => handleDelete(chat._id, e)}
                                            className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#404040] rounded-b-lg transition-colors"
                                        >
                                            Delete
                                        </button>
                                    </div>
                                )}
                            </div>
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
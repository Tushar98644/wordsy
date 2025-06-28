import {
    ChevronDown,
    Crown,
    Info,
    Share,
    Ellipsis,
    Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useUser, SignInButton, UserButton } from "@clerk/clerk-react";
import { useState } from "react";

const ChatHeader = ({ isCollapsed }: { isCollapsed: boolean }) => {
    const { isSignedIn } = useUser();
    const [openDropdown, setOpenDropdown] = useState(false);

    return (
        <div className="flex items-center justify-between px-5 py-2 border-b border-[#2f2f2f] relative">
            {/* Placeholder left section to preserve spacing */}
            <div className={!isCollapsed ? "invisible" : "flex items-center gap-4 relative"}>
                <div
                    className="flex items-center gap-2 cursor-pointer"
                    onClick={() => setOpenDropdown(prev => !prev)}
                >
                    <span className="font-medium text-lg">ChatGPT</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {openDropdown && !isCollapsed && (
                    <div className="absolute top-full mt-2 w-48 rounded-md border border-[#3f3f3f] bg-[#1e1e1e] shadow-lg z-50">
                        <div className="px-4 py-2 flex items-center justify-between text-sm hover:bg-[#2a2a2a] cursor-default">
                            ChatGPT
                            <Check className="w-4 h-4 text-green-500" />
                        </div>
                        <div className="px-4 py-2 text-sm hover:bg-[#2a2a2a] cursor-pointer">
                            ChatGPT Plus
                        </div>
                    </div>
                )}
            </div>

            {/* Centered Dropdown when collapsed */}
            {!isCollapsed && (
                <div
                    className="absolute left-1/2 -translate-x-1/2 flex items-center gap-2 cursor-pointer"
                    onClick={() => setOpenDropdown(prev => !prev)}
                >
                    <span className="font-medium text-lg">ChatGPT</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />

                    {openDropdown && (
                        <div className="absolute top-full mt-2 w-48 rounded-md border border-[#3f3f3f] bg-[#1e1e1e] shadow-lg z-50">
                            <div className="px-4 py-2 flex items-center justify-between text-sm hover:bg-[#2a2a2a] cursor-default">
                                ChatGPT
                                <Check className="w-4 h-4 text-green-500" />
                            </div>
                            <div className="px-4 py-2 text-sm hover:bg-[#2a2a2a] cursor-pointer">
                                ChatGPT Plus
                            </div>
                        </div>
                    )}
                </div>
            )}

            {/* Center section (memory info) hidden when collapsed */}
            {isCollapsed && (
                <div className="flex items-center gap-1 text-sm text-gray-400 relative group">
                    <span>Saved memory full</span>
                    <div className="relative">
                        <Info className="w-4 h-4 cursor-pointer" />
                        <div className="absolute z-50 w-[250px] bg-[#1e1e1e] text-gray-300 text-xs rounded-md p-2 mt-2 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none group-hover:pointer-events-auto left-1/2 -translate-x-1/2 top-full">
                            You’ve run out of space for saved memories.
                        </div>
                    </div>
                </div>
            )}

            {/* Right section */}
            <div className="flex items-center gap-2">
                {isCollapsed && (
                    <>
                        {isSignedIn ? (
                            <Button
                                variant="default"
                                className="bg-transparent text-white hover:bg-[#2f2f2f] px-3 py-1.5 rounded-3xl flex items-center gap-2 text-sm"
                            >
                                <Share className="w-4 h-4" />
                                <span className="hidden sm:inline">Share</span>
                            </Button>
                        ) : (
                            <SignInButton>
                                <Button className="bg-[#6366f1] hover:bg-[#5855eb] text-white px-4 py-2 rounded-lg flex items-center gap-2 h-9">
                                    <Crown className="w-4 h-4" />
                                    Get Plus
                                </Button>
                            </SignInButton>
                        )}

                        <Button
                            variant="default"
                            className="bg-transparent text-white hover:bg-[#2f2f2f] p-0 rounded-lg"
                        >
                            <Ellipsis className="w-4 h-4" />
                        </Button>
                    </>
                )}

                {/* Always show UserButton */}
                {isSignedIn ? (
                    <div className="pl-3">
                        <UserButton />
                    </div>
                ) : (
                    <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center text-sm font-medium">
                        ?
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatHeader;
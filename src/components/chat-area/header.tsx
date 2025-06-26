import { ChevronDown, Crown, Info, Maximize2 } from "lucide-react";
import { Button } from "../ui/button";

const ChatHeader = () => {
    return (
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2f2f2f]">
            <div className="flex items-center gap-4">
                <div className="w-6 h-6 bg-[#404040] rounded"></div>
                <div className="flex items-center gap-2">
                    <span className="font-medium text-lg">ChatGPT</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>
            </div>

            <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 text-sm text-gray-400">
                    <span>Saved memory full</span>
                    <Info className="w-4 h-4" />
                </div>
                <Button className="bg-[#6366f1] hover:bg-[#5855eb] text-white px-4 py-2 rounded-lg flex items-center gap-2 h-9">
                    <Crown className="w-4 h-4" />
                    Get Plus
                </Button>
                <Button variant="ghost" className="text-gray-400 hover:bg-[#2f2f2f] p-2 rounded-lg">
                    <Maximize2 className="w-4 h-4" />
                </Button>
                <div className="w-8 h-8 bg-[#22c55e] rounded-full flex items-center justify-center text-sm font-medium">
                    T
                </div>
            </div>
        </div>
    );
}

export default ChatHeader;
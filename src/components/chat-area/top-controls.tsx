import { ChevronDown, MoreHorizontal, Mic } from "lucide-react";
import { Button } from "../ui/button";

const TopControls = () => {
    return (
        <div className="flex items-center justify-between mb-6">
            <Button
                variant="outline"
                className="bg-[#2f2f2f] text-gray-400 border-[#404040] hover:bg-[#404040] rounded-2xl px-5 py-3 flex items-center gap-3 text-[16px] h-[52px]"
            >
                <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-sm text-white font-medium">M</span>
                </div>
                Talk to Mia
            </Button>

            <div className="flex items-center gap-3">
                <Button
                    variant="outline"
                    className="bg-[#2f2f2f] text-gray-400 border-[#404040] hover:bg-[#404040] rounded-2xl px-5 py-3 flex items-center gap-3 text-[16px] h-[52px]"
                >
                    <span className="text-xl">🇬🇧</span>
                    English (UK)
                    <ChevronDown className="w-4 h-4" />
                </Button>

                <Button
                    variant="outline"
                    className="bg-[#2f2f2f] text-gray-400 border-[#404040] hover:bg-[#404040] rounded-2xl w-[52px] h-[52px] flex items-center justify-center"
                >
                    <MoreHorizontal className="w-5 h-5" />
                </Button>

                <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-2xl w-[52px] h-[52px] flex items-center justify-center">
                    <Mic className="w-5 h-5" />
                </Button>
            </div>
        </div>
    );
}

export default TopControls;
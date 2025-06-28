import { GptsIcon } from "@/components/icons/GptsIcon";
import { SoraIcon } from "@/components/icons/SoraIcon";
import { Button } from "@/components/ui/button";

export const QuickActions = () => (
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
);
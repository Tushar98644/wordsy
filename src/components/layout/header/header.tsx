'use client'

import { Button } from "@/components/ui/button";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { AudioWaveformIcon, MessageCircleDashed } from "lucide-react";
import { AnimatedThemeToggler } from "@/components/layout/animated-theme-toggler";

const Header = () => {
   return (
      <header className="sticky top-0 z-50 flex items-center justify-between p-3">
         <SidebarTrigger />
         <div className="flex-1" />
         <div className="flex items-center gap-2">
            <AnimatedThemeToggler />
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     size={"icon"}
                     variant={"ghost"}
                     className="bg-secondary/40"
                     onClick={() => {
                        console.log("Toggle voice chat");
                     }}
                  >
                     <AudioWaveformIcon className="size-4" />
                  </Button>
               </TooltipTrigger>
               <TooltipContent align="end" side="bottom">
                  <div className="text-xs flex items-center gap-2">
                     Toggle VoiceChat
                  </div>
               </TooltipContent>
            </Tooltip>
            <Tooltip>
               <TooltipTrigger asChild>
                  <Button
                     size={"icon"}
                     variant={"secondary"}
                     className="bg-secondary/40"
                     onClick={() => {
                        console.log("Toggle temporary chat");
                     }}
                  >
                     <MessageCircleDashed className="size-4" />
                  </Button>
               </TooltipTrigger>
               <TooltipContent align="end" side="bottom">
                  <div className="text-xs flex items-center gap-2">
                     Toggle TemporaryChat
                  </div>
               </TooltipContent>
            </Tooltip>
         </div>
      </header>
   );
}

export default Header;
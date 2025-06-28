/* eslint-disable @next/next/no-img-element */
"use client"

import { Mic } from "lucide-react"
import { Button } from "@/components/ui/button"
import VoiceControlsMenu from "../input/voice-control"

export default function TopControls() {
    return (
        <div className="h-16 flex items-center justify-between px-2 sm:px-4">
            {/* Talk to Mia Input - Responsive layout */}
            <div className="flex items-center">
                <div className="flex items-center gap-1 sm:gap-3 bg-transparent rounded-sm px-2 sm:px-3 py-1 border border-white/20">
                    <button
                        id="mia-button"
                        tabIndex={-1}
                        className="flex items-center px-0 py-1 h-[22px] text-white text-xs rounded-md transition-colors
                        active:opacity-80 disabled:opacity-40 disabled:text-gray-400
                        bg-transparent focus:outline-none"
                    >
                        <img
                            src="chrome-extension://eollffkcakegifhacjnlnegohfdlidhn/assets/svg/imgMia-logo.chunk.svg"
                            alt="mia-ai"
                            className="h-[18px] sm:h-[22px] -mt-[1px] hover:animate-pulse"
                        />
                        <div className="pl-1 sm:pl-2 text-gray-500 text-[10px] sm:text-xs hidden xs:block">
                            Talk to Mia
                        </div>
                    </button>
                </div>
            </div>

            {/* Right Side Controls - Adjusted spacing */}
            <div className="flex items-center gap-1 sm:gap-3">
                {/* Language Selector */}
                <VoiceControlsMenu />

                {/* Microphone Button - Responsive size */}
                <Button 
                    size="sm" 
                    variant="default" 
                    className="w-7 h-7 sm:w-8 sm:h-8 rounded-md bg-blue-500 hover:bg-blue-500 hover:cursor-pointer p-0"
                >
                    <Mic className="size-3 sm:size-4 text-white" />
                </Button>
            </div>
        </div>
    )
}
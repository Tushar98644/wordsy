"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Paperclip,
    Search,
    Mic,
    MoreHorizontal,
    ChevronDown,
    BarChart3,
    PenTool,
    MessageCircle,
    Lightbulb,
    HelpCircle,
    AudioLines,
} from "lucide-react"

export default function ChatInterface() {
    const [message, setMessage] = useState("")

    return (
        <div className="min-h-screen bg-[#212121] text-white flex flex-col">
            {/* Top header */}
            <div className="flex justify-end items-center p-6 gap-3">
                <Button className="bg-white text-black hover:bg-gray-100 rounded-full px-6 py-2 text-[14px] font-medium">
                    Log in
                </Button>
                <Button variant="ghost" className="text-gray-300 hover:text-white hover:bg-gray-800 text-[14px] font-medium">
                    Sign up for free
                </Button>
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                    <HelpCircle className="w-4 h-4 text-gray-400" />
                </div>
            </div>

            {/* Main content */}
            <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-[1000px] mx-auto w-full">
                {/* Main heading */}
                <h1 className="text-[40px] font-normal text-center mb-12 text-white leading-tight">
                    {"What's on the agenda today?"}
                </h1>

                {/* Top controls */}
                <div className="flex items-center justify-between w-full max-w-3xl mb-6">
                    <Button
                        variant="outline"
                        className="bg-[#2f2f2f] text-gray-300 border-[#404040] hover:bg-[#404040] rounded-full px-4 py-2 flex items-center gap-2 text-[14px]"
                    >
                        <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                            <span className="text-xs text-white">M</span>
                        </div>
                        Talk to Mia
                    </Button>

                    <div className="flex items-center gap-3">
                        <Button
                            variant="outline"
                            className="bg-[#2f2f2f] text-gray-300 border-[#404040] hover:bg-[#404040] rounded-lg px-4 py-2 flex items-center gap-2 text-[14px]"
                        >
                            <span className="text-lg">🇬🇧</span>
                            English (UK)
                            <ChevronDown className="w-4 h-4" />
                        </Button>

                        <Button
                            variant="outline"
                            className="bg-[#2f2f2f] text-gray-300 border-[#404040] hover:bg-[#404040] p-2 rounded-lg"
                        >
                            <MoreHorizontal className="w-4 h-4" />
                        </Button>

                        <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white p-2 rounded-lg">
                            <Mic className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                {/* Chat input */}
                <div className="w-full">
                    <div className="relative bg-[#2f2f2f] rounded-3xl border border-[#404040] mb-4 shadow-lg">
                        <textarea
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Message ChatGPT..."
                            className="w-full bg-transparent border-0 text-white placeholder-gray-400 text-[18px] px-12 py-12 pr-32 focus:ring-0 focus:outline-none rounded-3xl resize-none leading-relaxed"
                            rows={1}
                        />

                        {/* Send button */}
                        <div className="absolute right-4 top-1/2 -translate-y-1/2">
                            <Button
                                className={`p-2 rounded-lg transition-colors ${message.trim()
                                    ? 'bg-green-600 hover:bg-green-700 text-white'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                    }`}
                                disabled={!message.trim()}
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
                                </svg>
                            </Button>
                        </div>

                        {/* Input controls */}
                        <div className="absolute left-6 bottom-4 flex items-center gap-3">
                            <Button
                                variant="ghost"
                                className="text-gray-400 hover:text-white hover:bg-[#404040] p-2 rounded-lg flex items-center gap-2 text-[14px]"
                            >
                                <Paperclip className="w-4 h-4" />
                                Attach
                            </Button>

                            <Button
                                variant="ghost"
                                className="text-gray-400 hover:text-white hover:bg-[#404040] p-2 rounded-lg flex items-center gap-2 text-[14px]"
                            >
                                <Search className="w-4 h-4" />
                                Search
                            </Button>
                        </div>

                        <div className="absolute right-20 bottom-4">
                            <Button
                                variant="ghost"
                                className="text-gray-400 hover:text-white hover:bg-[#404040] p-2 rounded-lg flex items-center gap-2 text-[14px]"
                            >
                                <AudioLines className="w-4 h-4" />
                                Voice
                            </Button>
                        </div>
                    </div>

                    {/* Disclaimer */}
                    <div className="text-center text-xs text-gray-500 mb-6">
                        ChatGPT can make mistakes. Consider checking important information.
                    </div>

                    {/* Suggestion chips */}
                    <div className="flex items-center justify-center gap-3 flex-wrap">
                        <Button
                            variant="outline"
                            className="bg-[#2f2f2f] text-gray-300 border-[#404040] hover:bg-[#404040] rounded-full px-4 py-2 flex items-center gap-2 text-[14px]"
                        >
                            <BarChart3 className="w-4 h-4 text-blue-400" />
                            Analyze data
                        </Button>

                        <Button
                            variant="outline"
                            className="bg-[#2f2f2f] text-gray-300 border-[#404040] hover:bg-[#404040] rounded-full px-4 py-2 flex items-center gap-2 text-[14px]"
                        >
                            <PenTool className="w-4 h-4 text-purple-400" />
                            Help me write
                        </Button>

                        <Button
                            variant="outline"
                            className="bg-[#2f2f2f] text-gray-300 border-[#404040] hover:bg-[#404040] rounded-full px-4 py-2 flex items-center gap-2 text-[14px]"
                        >
                            <MessageCircle className="w-4 h-4 text-teal-400" />
                            Get advice
                        </Button>

                        <Button
                            variant="outline"
                            className="bg-[#2f2f2f] text-gray-300 border-[#404040] hover:bg-[#404040] rounded-full px-4 py-2 flex items-center gap-2 text-[14px]"
                        >
                            <Lightbulb className="w-4 h-4 text-yellow-400" />
                            Make a plan
                        </Button>

                        <Button
                            variant="outline"
                            className="bg-[#2f2f2f] text-gray-300 border-[#404040] hover:bg-[#404040] rounded-full px-4 py-2 text-[14px]"
                        >
                            More
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}
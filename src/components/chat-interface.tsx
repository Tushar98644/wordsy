"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Paperclip, Search, Mic, MoreHorizontal, ChevronDown, HelpCircle, AudioLines } from "lucide-react"

export function ChatInterface() {
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
      <div className="flex-1 flex flex-col items-center justify-center px-4 max-w-5xl mx-auto w-full">
        {/* Main heading */}
        <h1 className="text-[48px] font-normal text-center mb-16 text-white leading-tight tracking-tight">
          {"What's on the agenda today?"}
        </h1>

        {/* Top controls */}
        <div className="flex items-center justify-between w-full max-w-4xl mb-8">
          <Button
            variant="outline"
            className="bg-[#2f2f2f] text-gray-400 border-[#404040] hover:bg-[#404040] rounded-2xl px-5 py-3 flex items-center gap-3 text-[16px] h-[52px]"
          >
            <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center">
              <span className="text-sm text-white font-medium">M</span>
            </div>
            Talk to Mia
          </Button>

          <div className="flex items-center gap-4">
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

        {/* Chat input container */}
        <div className="w-full max-w-4xl">
          <div className="relative bg-[#2f2f2f] rounded-[32px] border border-[#404040] mb-6">
            <Input
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Ask anything"
              className="w-full bg-transparent border-0 text-white placeholder-gray-500 text-[20px] px-8 py-8 focus:ring-0 focus:outline-none rounded-[32px] min-h-[120px]"
            />
          </div>

          {/* Bottom controls */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                className="bg-[#2f2f2f] text-gray-400 border-[#404040] hover:bg-[#404040] rounded-[24px] px-6 py-3 flex items-center gap-3 text-[16px] h-[48px]"
              >
                <Paperclip className="w-4 h-4" />
                Attach
              </Button>

              <Button
                variant="outline"
                className="bg-[#2f2f2f] text-gray-400 border-[#404040] hover:bg-[#404040] rounded-[24px] px-6 py-3 flex items-center gap-3 text-[16px] h-[48px]"
              >
                <Search className="w-4 h-4" />
                Search
              </Button>
            </div>

            <Button
              variant="outline"
              className="bg-[#2f2f2f] text-gray-400 border-[#404040] hover:bg-[#404040] rounded-[24px] px-6 py-3 flex items-center gap-3 text-[16px] h-[48px]"
            >
              <AudioLines className="w-4 h-4" />
              Voice
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
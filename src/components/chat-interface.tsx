"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  PenSquare,
  Search,
  Library,
  Sparkles,
  Grid3X3,
  Plus,
  Shuffle,
  Mic,
  MoreHorizontal,
  Crown,
  Maximize2,
  Info,
} from "lucide-react"

export function ChatInterface() {
  const [message, setMessage] = useState("")

  const chatHistory = [
    "Stack Elements Vertically",
    "Mobile site blocker",
    "Backend Language Comparison",
    "Catrobat Sunbird UCI Summary",
    "ChatGPT Model Type",
    "Bundle Size Optimization",
    "React Page Layout",
    "Git rm node_modules issue",
  ]

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-64 bg-gray-950 flex flex-col">
        {/* Top section */}
        <div className="p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 rounded-lg">
            <PenSquare className="w-4 h-4 mr-3" />
            New chat
          </Button>

          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 rounded-lg">
            <Search className="w-4 h-4 mr-3" />
            Search chats
          </Button>

          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 rounded-lg">
            <Library className="w-4 h-4 mr-3" />
            Library
          </Button>
        </div>

        <div className="border-t border-gray-800 p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 rounded-lg">
            <Sparkles className="w-4 h-4 mr-3" />
            Sora
          </Button>

          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 rounded-lg">
            <Grid3X3 className="w-4 h-4 mr-3" />
            GPTs
          </Button>
        </div>

        {/* Chat history */}
        <div className="flex-1 p-4">
          <h3 className="text-xs font-medium text-gray-500 mb-3 uppercase tracking-wider">Chats</h3>
          <div className="space-y-1">
            {chatHistory.map((chat, index) => (
              <button
                key={index}
                className="w-full text-left text-sm text-gray-300 hover:bg-gray-800 rounded-lg p-2 truncate"
              >
                {chat}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="p-4 border-t border-gray-800">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-800 rounded-lg">
            <Crown className="w-4 h-4 mr-3" />
            <div className="flex flex-col items-start">
              <span className="text-sm">Upgrade plan</span>
              <span className="text-xs text-gray-500">More access to the best models</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-gray-700 rounded" />
            <div className="flex items-center gap-2">
              <span className="font-medium">ChatGPT</span>
              <svg className="w-4 h-4 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Saved memory full</span>
              <Info className="w-4 h-4" />
            </div>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2">
              <Crown className="w-4 h-4" />
              Get Plus
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:bg-gray-800 p-2 rounded-lg">
              <Maximize2 className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center text-sm font-medium">
              T
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <h1 className="text-3xl font-medium text-center mb-8 text-gray-100">{"What's on the agenda today?"}</h1>

          <div className="w-full max-w-3xl">
            {/* Chat input */}
            <div className="relative">
              <div className="flex items-center gap-3 mb-4">
                <Button
                  variant="outline"
                  className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 rounded-full px-4 py-2 flex items-center gap-2"
                >
                  <div className="w-6 h-6 rounded-full bg-gray-600 flex items-center justify-center">
                    <span className="text-xs">M</span>
                  </div>
                  Talk to Mia
                </Button>

                <div className="flex-1" />

                <Button
                  variant="outline"
                  className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 rounded-lg px-4 py-2 flex items-center gap-2"
                >
                  <span className="text-sm">🇬🇧</span>
                  English (UK)
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Button>

                <Button
                  variant="outline"
                  className="bg-gray-800 text-gray-300 border-gray-600 hover:bg-gray-700 p-2 rounded-lg"
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>

                <Button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg">
                  <Mic className="w-4 h-4" />
                </Button>
              </div>

              <div className="relative bg-gray-800 rounded-2xl border border-gray-700">
                <Input
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Ask anything"
                  className="w-full bg-transparent border-0 text-white placeholder-gray-400 text-lg p-4 pr-20 focus:ring-0 focus:outline-none"
                />

                <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2">
                  <Button variant="ghost" className="text-gray-400 hover:text-white p-1">
                    <Plus className="w-5 h-5" />
                  </Button>

                  <Button variant="ghost" className="text-gray-400 hover:text-white p-1 flex items-center gap-1">
                    <Shuffle className="w-4 h-4" />
                    <span className="text-sm">Tools</span>
                  </Button>

                  <Button variant="ghost" className="text-gray-400 hover:text-white p-1">
                    <Mic className="w-5 h-5" />
                  </Button>

                  <Button variant="ghost" className="text-gray-400 hover:text-white p-1">
                    <div className="w-5 h-5 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-sm" />
                    </div>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
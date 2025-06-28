"use client"

import ChatInterface from "@/components/chat-interface"
import { ChatProvider } from "@/context/chat-context"

export default function Home() {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  )
}
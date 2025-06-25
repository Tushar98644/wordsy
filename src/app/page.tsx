"use client"

import { WelcomeModal } from "@/components/welcome-modal"
import ChatInterface from "@/components/chat"
import { useUser } from "@clerk/nextjs"

export default function Home() {
  return (
    <ChatInterface />
  )
}
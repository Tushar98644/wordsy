"use client"

import { useState } from "react"
import { WelcomeModal } from "@/components/welcome-modal"
import ChatInterface from "@/components/chat"
import { redirect } from "next/navigation"

export default function Home() {
  const [currentView, setCurrentView] = useState<"welcome" | "login" | "chat">("welcome")

  if (currentView === "welcome") {
    return <WelcomeModal />
  }

  if (currentView === "login") {
    redirect("/log-in")
  }

  return <ChatInterface />
}
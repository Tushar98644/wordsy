"use client"

import { useState } from "react"
import { WelcomeModal } from "@/components/welcome-modal"
import { LoginForm } from "@/components/login-form"
import { ChatInterface } from "@/components/chat-interface"

export default function Home() {
  const [currentView, setCurrentView] = useState<"welcome" | "login" | "chat">("welcome")

  const handleLogin = () => {
    setCurrentView("login")
  }

  const handleSignup = () => {
    setCurrentView("login")
  }

  const handleContinue = () => {
    setCurrentView("chat")
  }

  const handleStayLoggedOut = () => {
    setCurrentView("chat")
  }

  if (currentView === "welcome") {
    return <WelcomeModal onLogin={handleLogin} onSignup={handleSignup} onStayLoggedOut={handleStayLoggedOut} />
  }

  if (currentView === "login") {
    return <LoginForm onContinue={handleContinue} />
  }

  return <ChatInterface />
}
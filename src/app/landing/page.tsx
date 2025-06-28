"use client"

import ChatInterface from "@/components/chat-window/chat-interface"
import { useUser } from "@clerk/nextjs";
import { WelcomeModal } from "@/components/welcome-modal";

export default function LandingPage() {

  const { isSignedIn } = useUser();
  return (
    <>
      {isSignedIn ? (
        <ChatInterface />
      ) : (
        <div className="relative h-screen w-screen bg-[#212121] overflow-hidden">
          <div className="absolute inset-0 filter blur-xs pointer-events-none">
            <ChatInterface />
          </div>

          <div className="absolute inset-0 z-10 flex items-center justify-center">
            <WelcomeModal />
          </div>
        </div>
      )}
    </>
  )
}
"use client"

import ChatInterface from "@/components/chat-interface"
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
      {/* Blurred background chat layout */}
      <div className="absolute inset-0 filter blur-sm pointer-events-none">
        <ChatInterface />
      </div>

      {/* Welcome Modal on top */}
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <WelcomeModal />
      </div>
    </div>
    )}
    </>
  )
}
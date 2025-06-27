"use client"

import { Button } from "@/components/ui/button"
import { SignUpButton } from "@clerk/nextjs"
import { redirect } from "next/navigation";

interface WelcomeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const WelcomeModal = ({isOpen, onClose}: WelcomeModalProps) => {
  
  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Main modal */}
      {isOpen && (
        <div className="flex relative items-center justify-center min-h-screen px-4">
          <div className="bg-[#2f2f2f] rounded-3xl p-14 max-w-[500px] w-full text-center shadow-2xl">
            <h1 className="text-white text-[32px] font-semibold mb-2 leading-tight">Welcome back</h1>

            <p className="text-white text-[22px] mb-6 leading-relaxed px-2">
              Log in or sign up to get smarter responses, upload files and images, and more.
            </p>

            <div className="space-y-4">
                <Button onClick={()=>redirect("/log-in")} className="w-full cursor-pointer bg-white text-black hover:bg-gray-100 rounded-full h-[50px] text-[16px] font-medium transition-colors">
                  Log in
                </Button>

              <SignUpButton mode="redirect">
                <Button
                  onClick={()=>redirect("/sign-up")}
                  variant="outline"
                  className="w-full bg-transparent hover:cursor-pointer text-white border-[#5f5f5f] hover:bg-[#404040] hover:text-white rounded-full h-[50px] text-[16px] font-medium transition-colors"
                >
                  Sign up for free
                </Button>
              </SignUpButton>
            </div>

            <button onClick={() => onClose()} className="mt-6 hover:cursor-pointer text-white underline text-[20px] transition-colors">
              Stay logged out
            </button>
          </div>
        </div >
      )}
    </div>
  )
}

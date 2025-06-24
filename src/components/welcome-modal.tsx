"use client"

import { Button } from "@/components/ui/button"

interface WelcomeModalProps {
  onLogin: () => void
  onSignup: () => void
  onStayLoggedOut: () => void
}

export function WelcomeModal({ onLogin, onSignup, onStayLoggedOut }: WelcomeModalProps) {
  return (
    <div className="min-h-screen bg-black/90 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background blur effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900/50 to-black/80" />

      {/* Blurred background elements */}
      <div className="absolute left-8 top-1/2 -translate-y-1/2 text-gray-600 text-xl opacity-30">Ask anything</div>
      <div className="absolute left-8 bottom-32 text-gray-600 opacity-30 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-blue-500/50" />
        Analyze images
      </div>
      <div className="absolute right-8 top-1/2 -translate-y-1/2 text-gray-600 opacity-30 flex items-center gap-2">
        <div className="w-4 h-4 rounded-full bg-yellow-500/50" />
        Brainstorm
      </div>
      <div className="absolute right-8 bottom-32 text-gray-600 opacity-30">More</div>

      {/* Top right buttons */}
      <div className="absolute top-6 right-6 flex items-center gap-3">
        <Button
          variant="outline"
          className="bg-gray-800 text-white border-gray-600 hover:bg-gray-700"
          onClick={onLogin}
        >
          Log in
        </Button>
        <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-gray-800" onClick={onSignup}>
          Sign up for free
        </Button>
        <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
          <span className="text-gray-400 text-sm">?</span>
        </div>
      </div>

      {/* Main modal */}
      <div className="relative bg-gray-800 rounded-2xl p-8 max-w-md w-full text-center">
        <h1 className="text-white text-3xl font-semibold mb-6">Welcome back</h1>
        <p className="text-gray-300 text-lg mb-8 leading-relaxed">
          Log in or sign up to get smarter responses, upload files and images, and more.
        </p>

        <div className="space-y-4">
          <Button
            className="w-full bg-white text-black hover:bg-gray-100 rounded-full py-3 text-base font-medium"
            onClick={onLogin}
          >
            Log in
          </Button>
          <Button
            variant="outline"
            className="w-full bg-transparent text-white border-gray-600 hover:bg-gray-700 rounded-full py-3 text-base font-medium"
            onClick={onSignup}
          >
            Sign up for free
          </Button>
        </div>

        <button className="mt-6 text-gray-400 hover:text-white underline text-sm" onClick={onStayLoggedOut}>
          Stay logged out
        </button>
      </div>
    </div>
  )
}

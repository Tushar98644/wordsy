"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Phone } from "lucide-react"

interface LoginFormProps {
  onContinue: () => void
}

export function LoginForm({ onContinue }: LoginFormProps) {
  const [email, setEmail] = useState("")

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">ChatGPT</h1>
        </div>

        {/* Main form */}
        <div className="bg-white rounded-lg p-8 shadow-sm">
          <h2 className="text-2xl font-semibold text-center text-gray-900 mb-8">Welcome back</h2>

          <div className="space-y-4">
            <div>
              <Input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <Button
              className="w-full bg-black text-white hover:bg-gray-800 rounded-lg py-3 text-base font-medium"
              onClick={onContinue}
            >
              Continue
            </Button>
          </div>

          <div className="text-center mt-6">
            <span className="text-gray-600">{"Don't have an account? "}</span>
            <button className="text-blue-600 hover:underline font-medium">Sign up</button>
          </div>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          <div className="space-y-3">
            <Button
              variant="outline"
              className="w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-50 rounded-lg py-3 text-base font-medium flex items-center justify-center gap-3"
            >
              <Phone className="w-5 h-5" />
              Continue with phone
            </Button>

            <Button
              variant="outline"
              className="w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-50 rounded-lg py-3 text-base font-medium flex items-center justify-center gap-3"
            >
              <div className="w-5 h-5 bg-gradient-to-r from-blue-500 to-red-500 rounded" />
              Continue with Google
            </Button>

            <Button
              variant="outline"
              className="w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-50 rounded-lg py-3 text-base font-medium flex items-center justify-center gap-3"
            >
              <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-blue-400 rounded" />
              Continue with Microsoft Account
            </Button>

            <Button
              variant="outline"
              className="w-full bg-white text-gray-700 border-gray-300 hover:bg-gray-50 rounded-lg py-3 text-base font-medium flex items-center justify-center gap-3"
            >
              <div className="w-5 h-5 bg-black rounded" />
              Continue with Apple
            </Button>
          </div>
        </div>

        <div className="text-center mt-8 text-sm text-gray-500 space-x-4">
          <button className="hover:underline">Terms of Use</button>
          <span>|</span>
          <button className="hover:underline">Privacy Policy</button>
        </div>
      </div>
    </div>
  )
}

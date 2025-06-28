import ChatInterface from '@/components/chat-interface';
import { ChatProvider } from '@/context/chat-context';
import React from 'react'

const HomePage = () => {
  return (
    <ChatProvider>
      <ChatInterface />
    </ChatProvider>
  )
}

export default HomePage;
"use client";

import React from "react";
import { ChatProvider } from "@/context/chat-context";
import { UIProvider } from "@/context/ui-context";
import { MainContent } from "@/components/chat-window/main-content";

const ChatInterfaceContent: React.FC = () => {
  return (
    <div className="flex h-screen bg-[#212121] text-white overflow-hidden">
      <MainContent />
    </div>
  );
};

const ChatInterface: React.FC = () => {
  return (
    <ChatProvider>
      <UIProvider>
        <ChatInterfaceContent />
      </UIProvider>
    </ChatProvider>
  );
};

export default ChatInterface;
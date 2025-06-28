"use client";

import { createContext, useContext } from "react";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useChatManager } from "@/hooks/useChatManager";
import { useMessageActions } from "@/hooks/useMessageActions";
import { useUser } from "@clerk/nextjs";

const ChatContext = createContext<ReturnType<typeof useChatContextValue> | null>(null);

function useChatContextValue() {
  const { user } = useUser();

  const fileUpload = useFileUpload();

  const chat = useChatManager({
    userId: user?.id || null,
    fileUrl: fileUpload.fileUrl,
    fileType: fileUpload.fileType,
  });

  const messageActions = useMessageActions({
    messages: chat.messages,
    setMessages: chat.setMessages,
    chatId: chat.chatId,
  });

  return {
    ...fileUpload,
    ...chat,
    ...messageActions,
  };
}

export const ChatProvider = ({ children }: { children: React.ReactNode }) => {
  const value = useChatContextValue();
  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const ctx = useContext(ChatContext);
  if (!ctx) {
    throw new Error("useChatContext must be used inside a <ChatProvider>");
  }
  return ctx;
};
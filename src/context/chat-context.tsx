'use client';

import { createContext, useContext, ReactNode } from 'react';
import { useFileUpload } from "@/hooks/useFileUpload";
import { useChatManager } from "@/hooks/useChatManager";
import { useMessageActions } from "@/hooks/useMessageActions";

interface ChatContextType {
  // File upload
  file?: File | null;
  fileUrl?: string | null;
  fileMetadata?: any;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  isUploading: boolean;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeFile: () => void;
  
  // Chat management
  chatId: string | null;
  setChatId: (chatId: string | null) => void;
  messages: any[];
  input: string;
  setInput: (input: string) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  setMessages: (messages: any[]) => void;
  resetChat: () => void;
  isLoading: boolean;
  
  // Message actions
  isEditing: any;
  setIsEditing: (editing: any) => void;
  handleEditMessage: (id: string, content: string) => void;
  handleDeleteMessage: (id: string) => void;
  handleSaveEdit: (e: React.FormEvent) => Promise<void>;
  
  // User
  user: any;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // const { user } = useUser();
  const user = {
    id: '1',
  };
  const fileUpload = useFileUpload();
  const chatManager = useChatManager({
    userId: user?.id || null,
    fileUrl: fileUpload.fileUrl,
    fileMetadata: fileUpload.fileMetadata,
  });
  const messageActions = useMessageActions({ 
    messages: chatManager.messages, 
    setMessages: chatManager.setMessages, 
    chatId: chatManager.chatId 
  });

  const value: ChatContextType = {
    ...fileUpload,
    ...chatManager,
    ...messageActions,
    user,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};
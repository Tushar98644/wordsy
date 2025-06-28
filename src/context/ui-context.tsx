import React, { createContext, useContext, ReactNode } from 'react';
import { useMobileSidebar } from '@/hooks/useMobileSidebar';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useKeyboardHandlers } from '@/hooks/useKeyboardHandlers';
import { useChatContext } from '@/context/chat-context';

interface UIContextType {
  // Mobile sidebar
  mobileSidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  
  // Auto scroll
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
  
  // Keyboard handlers
  handleKeyPress: (e: React.KeyboardEvent) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export const UIProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const { chatId, input, file, fileMetadata, handleSubmit, removeFile } = useChatContext();
  
  const mobileSidebar = useMobileSidebar(chatId);
  const autoScroll = useAutoScroll(useChatContext().messages);
  const keyboardHandlers = useKeyboardHandlers({
    input,
    file,
    fileMetadata,
    handleSubmit,
    removeFile,
  });

  const value: UIContextType = {
    ...mobileSidebar,
    ...autoScroll,
    ...keyboardHandlers,
  };

  return <UIContext.Provider value={value}>{children}</UIContext.Provider>;
};

export const useUIContext = () => {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error('useUIContext must be used within a UIProvider');
  }
  return context;
};
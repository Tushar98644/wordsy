import { useState, useRef, useEffect } from 'react';

export const useMobileSidebar = (chatId: string | null) => {
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);
  const prevChatIdRef = useRef<string | null>(null);

  useEffect(() => {
    if (chatId && chatId !== prevChatIdRef.current && mobileSidebarOpen) {
      setMobileSidebarOpen(false);
    }
    prevChatIdRef.current = chatId;
  }, [chatId, mobileSidebarOpen]);

  const openSidebar = () => setMobileSidebarOpen(true);
  const closeSidebar = () => setMobileSidebarOpen(false);

  return {
    mobileSidebarOpen,
    openSidebar,
    closeSidebar,
  };
};
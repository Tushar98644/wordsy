import React from 'react';
import ChatHeader from "./header";
import { MobileSidebarToggle } from "@/components/chat-window/mobile-sidebar-toggle";
import { EmptyState } from './empty-state';
import { ChatArea } from './chat-area';
import { useUIContext } from '@/context/ui-context';
import { useChatContext } from '@/context/chat-context';

export const MainContent: React.FC = () => {
  const { mobileSidebarOpen } = useUIContext();
  const { messages } = useChatContext();

  return (
    <div className="flex-1 flex flex-col min-w-0">
      <ChatHeader isOpen={mobileSidebarOpen} />
      <MobileSidebarToggle />

      <div className="flex-1 flex flex-col overflow-hidden">
        {messages.length === 0 ? (
          <EmptyState />
        ) : (
          <ChatArea />
        )}
      </div>
    </div>
  );
};
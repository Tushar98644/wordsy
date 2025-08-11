import React from 'react';
import { EmptyState } from './empty-state';
import { ChatArea } from './chat-area';
import { useChatContext } from '@/context/chat-context';

export const MainContent: React.FC = () => {
  const { messages } = useChatContext();

  return (
    <div className="flex-1 flex flex-col min-w-0">
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
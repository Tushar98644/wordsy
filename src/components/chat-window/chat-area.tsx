import React from 'react';
import MessageContainer from "@/components/messages/message-container";
import ChatInput from "@/components/input/prompt-input";
import { useChatContext } from "@/context/chat-context";
import { useUIContext } from "@/context/ui-context";

export const ChatArea: React.FC = () => {
  const { messages, handleEditMessage, handleDeleteMessage } = useChatContext();
  const { messagesEndRef } = useUIContext();

  return (
    <div className="flex flex-col flex-1 overflow-hidden">
      <div className="flex-1 overflow-auto">
        <MessageContainer
          messages={messages}
          handleEditMessage={handleEditMessage}
          handleDeleteMessage={handleDeleteMessage}
          messagesEndRef={messagesEndRef}
        />
      </div>
      <div className="flex-shrink-0 w-full max-w-4xl mx-auto p-4">
        <ChatInput />
      </div>
    </div>
  );
};
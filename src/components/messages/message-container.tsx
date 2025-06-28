import React from 'react';
import { MessageContainerProps } from "@/types/message";
import { useMessageContainer } from "@/hooks/useMessageContainer";
import Message from './message';

const MessageContainer: React.FC<MessageContainerProps> = ({ 
  messages, 
  handleEditMessage, 
  messagesEndRef 
}) => {
  const { processedMessages } = useMessageContainer({ messages });

  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="max-w-3xl mx-auto flex flex-col space-y-4">
        {processedMessages.map((message) => (
          <Message
            key={message.id}
            message={message}
            onEdit={handleEditMessage}
          />
        ))}
        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageContainer;
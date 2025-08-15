import { useMemo } from 'react';
import type { Message } from '@/types/message';

interface UseMessageContainerProps {
  messages: Message[];
}

export const useMessageContainer = ({ messages }: UseMessageContainerProps) => {
  const processedMessages = useMemo(() => {
    return messages.map(message => ({
      ...message,
      files: message.files || []
    }));
  }, [messages]);

  return {
    processedMessages
  };
};
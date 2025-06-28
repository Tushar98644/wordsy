import { useMemo } from 'react';
import { IMessage } from '@/types/message';

interface UseMessageContainerProps {
  messages: IMessage[];
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
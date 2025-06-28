import { useRef, useEffect } from 'react';

export const useAutoScroll = (messages: any[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return { messagesEndRef };
};

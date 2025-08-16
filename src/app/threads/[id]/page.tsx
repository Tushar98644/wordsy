'use client'

import { useParams } from 'next/navigation';
import { useFetchThread } from '@/hooks/queries/useThreadQuery';
import PromptInput from '@/components/input/prompt-input';
import { useChat } from '@ai-sdk/react';
import { DefaultChatTransport } from 'ai';
import { toUIMessages } from '@/utils/convertMessage';
import { useMemo, useEffect } from 'react';
import { useAutoScroll } from '@/hooks/useAutoScroll';

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const {  data: thread } = useFetchThread(id);
  
  const uiMessages = useMemo(() => {
    return toUIMessages(thread?.messages || []);
  }, [thread?.messages]);

  const { 
    messages, 
    setMessages, 
    sendMessage, 
    status 
  } = useChat({
    messages: uiMessages,
    transport: new DefaultChatTransport({
      api: '/api/v1/chat',
      headers: { 'Content-Type': 'application/json' },
    }),
  });

  useEffect(() => {
    if (thread?.messages && thread.messages.length > 0) {
      setMessages(uiMessages);
    }
  }, [thread?.messages, uiMessages, setMessages]);

  const handleSendMessage = (content: string) => {
    sendMessage({ text: content }, { body : { threadId: id } });
  };

  const { messagesEndRef } = useAutoScroll(messages);

  const hasMessages = messages.length > 0;
  const isStreaming = status === 'streaming';

  return (
    <section id='chat-window' className="h-full w-full flex flex-col relative">
      <div id='chat-area' className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
        {hasMessages && (
          <div className="max-w-4xl mx-auto space-y-4 pb-28">
            {messages.map((message) => (
              <div key={message.id} className={`flex w-full ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[80%] sm:max-w-[70%] md:max-w-[60%] flex flex-col">
                  <span className={`text-xs mx-3 text-muted-foreground flex mb-1 capitalize ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    {message.role}
                  </span>
                  <div className={`p-3 rounded-lg ${message.role === 'user' ? 'text-white ml-auto' : ''}`}>
                    <span className="text-sm whitespace-pre-wrap">
                      {message.parts.map((part, index) => 
                        part.type === 'text' ? part.text : null
                      ).join('')}
                      {isStreaming && message === messages[messages.length - 1] && (
                        <span className="animate-pulse">|</span>
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ))}

            {status === 'submitted' && (
              <div className="flex justify-start">
                <div className="max-w-[80%] flex flex-col">
                  <span className="text-xs mx-3 text-muted-foreground mb-1">assistant</span>
                  <div className="p-3 rounded-lg">
                    <span className="text-sm">Thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>
      {hasMessages ? (
        <div className="absolute bottom-0 left-0 right-0 bg-transparent px-4 py-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <PromptInput 
              onSendMessage={handleSendMessage} 
              disabled={status !== 'ready'} 
            />
          </div>
        </div>
      ) : (
        <div className="h-full flex items-center justify-center">
          <div className="w-full max-w-4xl">
            <PromptInput 
              onSendMessage={handleSendMessage} 
              disabled={status !== 'ready'} 
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default ChatPage;
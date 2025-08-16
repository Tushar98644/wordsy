'use client';

import { useParams } from 'next/navigation';
import { useFetchThread } from '@/hooks/queries/useThreadQuery';
import { useSendMessage } from '@/hooks/queries/useMessageQuery';
import PromptInput from '@/components/input/prompt-input';

const ChatPage = () => {
  const { id } = useParams<{ id: string }>();
  const { data: thread } = useFetchThread(id);
  const { mutate: sendMessage } = useSendMessage();

  const handleSendMessage = (content: string) => {
      sendMessage({ threadId: id, message: { role: 'user', content } });
  };

  return (
    <div
      id="chat-window"
      className={`w-full flex flex-col h-full px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12 ${
        thread?.messages.length === 0 ? 'items-center justify-center' : 'justify-between'
      }`}
    >
      <div
        className={`h-max w-full min-h-0 overflow-scroll ${
          thread?.messages.length === 0 ? 'hidden' : 'block'
        }`}
      >
        {thread?.messages.map((message) => (
          <div
            key={message._id}
            className={`w-full my-4 flex items-center ${
              message.role === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div className="max-w-[80%] flex flex-col items-end">
              <span className="text-sm text-muted-foreground">{message.role}</span>
              <span className="text-sm text-muted-foreground">{message.content}</span>
            </div>
          </div>
        ))}
      </div>
      <div
        className={`w-full max-w-4xl mx-auto ${
          thread?.messages.length === 0 ? 'absolute bottom-1/2 transform -translate-y-1/2' : 'absolute bottom-0'
        }`}
      >
        <PromptInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
};

export default ChatPage;

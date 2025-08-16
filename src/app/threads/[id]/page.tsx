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

  const hasMessages = thread?.messages && thread.messages.length > 0;

  return (
    <section id='chat-window' className="h-full w-full flex flex-col relative">
      <div id='chat-area' className="flex-1 overflow-y-auto px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12">
        {hasMessages ? (
          <div className="max-w-4xl mx-auto space-y-4 pb-24"> {/* Added bottom padding so messages don't hide behind input */}
            {thread.messages.map((message) => (
              <div
                key={message._id}
                className={`flex w-full ${
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                <div className="max-w-[80%] sm:max-w-[70%] md:max-w-[60%] flex flex-col">
                  <span className="text-xs text-muted-foreground mb-1 capitalize">
                    {message.role}
                  </span>
                  <div
                    className={`p-3 rounded-lg ${
                      message.role === 'user'
                        ? 'bg-blue-600 text-white ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <span className="text-sm whitespace-pre-wrap">
                      {message.content}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          // Empty state - centers the input
          <div className="h-full flex items-center justify-center">
            <div className="w-full max-w-4xl">
              <PromptInput onSendMessage={handleSendMessage} />
            </div>
          </div>
        )}
      </div>

      {/* Overlay Input at Bottom (only when there are messages) */}
      {hasMessages && (
        <div className="absolute bottom-0 left-0 right-0 bg-transparent px-4 py-4 sm:px-6 md:px-8 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <PromptInput onSendMessage={handleSendMessage} />
          </div>
        </div>
      )}
    </section>
  );
};

export default ChatPage;

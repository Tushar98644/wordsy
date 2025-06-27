/* eslint-disable @next/next/no-img-element */
import { Copy, Edit } from "lucide-react";
import { Button } from "../ui/button";

interface ContainerProps {
  messages: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system' | 'data';
    content:
      | string
      | Array<
          | { type: 'text'; text: string }
          | { type: 'file'; data: string; mimeType?: string }
        >;
  }>;
  handleEditMessage: (id: string, content: string) => void;
  handleDeleteMessage: (id: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessageContainer = ({ messages, handleEditMessage, handleDeleteMessage, messagesEndRef }: ContainerProps) => (
  <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
    <div className="max-w-3xl mx-auto flex flex-col space-y-4">
      {messages.map((message) => {
        const isUser = message.role === 'user';
        return (
          <div key={message.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>  
            <div className="max-w-[80%] flex flex-col items-end">
              <div
                className={`px-6 py-4 text-base whitespace-pre-wrap break-words ` +
                  (isUser
                    ? 'bg-[#2f2f2f] text-white rounded-[30px] shadow-md'
                    : 'bg-none text-gray-100 rounded-[30px] rounded-bl-md')
                }
              >
                {Array.isArray(message.content) ? message.content.map((part, idx) => {
                      if (part.type === 'text') {
                        return <p key={idx} className="mb-2">{part.text}</p>;
                      }
                      if (part.type === 'file') {
                        const fileName = decodeURIComponent(part.data.split('/').pop() || 'File');
                        const isImage = part.mimeType?.startsWith('image/');
                        const isPDF = part.mimeType?.includes('pdf');
                        const isDOCX = part.mimeType?.includes('officedocument');
                        return (
                          <div key={idx} className="flex items-center gap-3 bg-[#3a3a3a] p-3 rounded-lg mb-2">
                            <div className="w-10 h-10 rounded bg-[#4b4b4b] flex items-center justify-center text-xs font-bold text-white">
                              {isImage ? 'IMG' : isPDF ? 'PDF' : isDOCX ? 'DOC' : 'FILE'}
                            </div>
                            <div className="flex flex-col text-sm text-white">
                              <span className="font-medium truncate max-w-[160px]">{fileName}</span>
                              <a href={part.data} target="_blank" rel="noopener noreferrer" className="text-xs text-blue-400 hover:underline">
                                Open file
                              </a>
                            </div>
                            {isImage && (
                              <img src={part.data} alt="uploaded" className="ml-auto max-h-20 rounded-md object-contain" />
                            )}
                          </div>
                        );
                      }
                      return null;
                    })
                  : <span>{message.content}</span>
                }
              </div>
              {isUser && (
                <div className="flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                  <Button size="icon" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => handleDeleteMessage(message.id)}>
                    <Copy className="size-5" />
                  </Button>
                  <Button size="icon" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => handleEditMessage(
                    message.id,
                    Array.isArray(message.content)
                      ? message.content.filter(p => p.type === 'text').map(p => p.text).join('\n')
                      : message.content
                  )}>
                    <Edit className="size-5" />
                  </Button>
                </div>
              )}
            </div>
          </div>
        );
      })}
      <div ref={messagesEndRef} />
    </div>
  </div>
);

export default MessageContainer;
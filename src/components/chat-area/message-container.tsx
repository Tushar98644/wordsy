import { Copy, Edit } from "lucide-react";
import { Button } from "../ui/button";

/* eslint-disable @next/next/no-img-element */

interface ContainerProps {
  messages: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system' | 'data';
    content: string;
  }>;
  isLoading: boolean;
  handleEditMessage: (id: string, content: string) => void;
  handleDeleteMessage: (id: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessageContainer = ({
  messages,
  isLoading,
  handleEditMessage,
  handleDeleteMessage,
  messagesEndRef,
}: ContainerProps) => {
  return (
    <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
      <div className="max-w-3xl mx-auto flex flex-col space-y-4">
        {messages.map((message) => {
          const isUser = message.role === "user";
          const fileUrl = message.content.match(/\[File: (.*?)\]/)?.[1];
          const contentText = message.content.replace(/\[File: .*?\]/, "").trim();

          return (
            <div
              key={message.id}
              className={`flex ${isUser ? "justify-end" : "justify-start"}`}
            >
              <div className="max-w-[80%] sm:max-w-[75%] md:max-w-[65%] flex flex-col gap-1 items-end">
                <div
                  className={`px-6 py-4 text-base whitespace-pre-wrap break-words 
                    ${isUser
                      ? "bg-[#2f2f2f] text-white rounded-[30px] shadow-md"
                      : "bg-none text-gray-100 rounded-[30px] rounded-bl-md"
                    }`}
                >
                  {/* File preview */}
                  {fileUrl && (
                    <div className="mb-3">
                      {fileUrl.includes("image") ? (
                        <img
                          src={fileUrl}
                          alt="Uploaded file"
                          className="max-w-full max-h-48 rounded-md"
                        />
                      ) : (
                        <div className="flex items-center gap-2 p-2 bg-[#404040] rounded text-xs text-white">
                          <div className="bg-gray-600 w-8 h-8 flex items-center justify-center rounded">
                            DOC
                          </div>
                          <span className="truncate">{fileUrl.split("/").pop()}</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Message content */}
                  <span>{contentText}</span>
                </div>

                {isUser && (
                  <div className="flex gap-1 opacity-0 hover:opacity-100 transition-opacity">
                         <Button
                      size="icon"
                      variant="ghost"
                      className="text-white/60 hover:text-white hover:bg-white/10"
                      onClick={() => handleDeleteMessage(message.id)}
                    >
                      <Copy className="w-4 h-4" />
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      className="text-white/60 hover:text-white hover:bg-white/10"
                      onClick={() => handleEditMessage(message.id, contentText)}
                    >
                      <Edit className="w-4 h-4" />
                    </Button>
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Loading animation */}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-[#2f2f2f] px-4 py-3 rounded-[30px] rounded-bl-md text-gray-200 text-sm shadow-md">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>
    </div>
  );
};

export default MessageContainer;
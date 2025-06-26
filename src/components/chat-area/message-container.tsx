import { Edit, Trash } from "lucide-react";
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
    messagesEndRef
}: ContainerProps
) => {
    return ( 
         <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6 max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-3xl px-6 py-4 rounded-2xl ${message.role === 'user'
                          ? 'bg-[#4f46e5] text-white rounded-br-none'
                          : 'bg-[#2f2f2f] text-gray-200 rounded-bl-none'
                        }`}>
                        {/* File preview */}
                        {message.content.includes('[File:') && message.role === 'user' && (
                          <div className="mb-3">
                            {message.content.includes('image') ? (
                              <img
                                src={message.content.match(/\[File: (.*?)\]/)?.[1]}
                                alt="Uploaded content"
                                className="max-w-xs max-h-48 rounded-lg"
                              />
                            ) : (
                              <div className="flex items-center gap-2 p-2 bg-[#3f3f3f] rounded">
                                <div className="bg-gray-500 w-8 h-8 rounded flex items-center justify-center">
                                  <span className="text-xs">DOC</span>
                                </div>
                                <span className="text-sm truncate max-w-xs">
                                  {message.content.match(/\[File: (.*?)\]/)?.[1]?.split('/').pop() || 'Document'}
                                </span>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Message content */}
                        {message.content.replace(/\[File: .*?\]/, '')}

                        {/* Message actions */}
                        {message.role === 'user' && (
                          <div className="flex justify-end mt-3 space-x-2">
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-gray-300 hover:text-white hover:bg-[#404040]"
                              onClick={() => handleEditMessage(message.id, message.content.replace(/\[File: .*?\]/, ''))}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button
                              size="icon"
                              variant="ghost"
                              className="text-gray-300 hover:text-white hover:bg-[#404040]"
                              onClick={() => handleDeleteMessage(message.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}

                  {isLoading && (
                    <div className="flex justify-start">
                      <div className="max-w-3xl px-6 py-4 rounded-2xl bg-[#2f2f2f] text-gray-200 rounded-bl-none">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                        </div>
                      </div>
                    </div>
                  )}

                  <div ref={messagesEndRef} />
                </div>
              </div>
     );
}
 
export default MessageContainer;
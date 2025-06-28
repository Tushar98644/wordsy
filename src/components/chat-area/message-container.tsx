import { Copy, Edit, Download, ExternalLink, FileText, ImageIcon } from "lucide-react";
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

const MessageContainer = ({ messages, handleEditMessage, handleDeleteMessage, messagesEndRef }: ContainerProps) => {

  const getFileName = (url: string): string => {
    return decodeURIComponent(url.split('/').pop() || 'File');
  };

  return (
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
                  {Array.isArray(message.content) ? (
                    <div className="space-y-3">
                      {message.content.map((part, idx) => {
                        if (part.type === 'text') {
                          return <p key={idx} className="text-white">{part.text}</p>;
                        }
                        if (part.type === 'file') {
                          const fileName = getFileName(part.data);
                          const isImage = part.mimeType?.startsWith('image/');
                          const isPDF = part.mimeType?.includes('pdf');
                          const isDocument = part.mimeType?.includes('document') || part.mimeType?.includes('text');
                          
                          return (
                            <div key={idx} className="bg-[#3a3a3a] rounded-xl p-4 border border-gray-600">
                              {isImage ? (
                                // Enhanced Image Display
                                <div className="space-y-3">
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                                      <ImageIcon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <p className="text-white font-medium truncate">{fileName}</p>
                                      <p className="text-gray-400 text-sm">Image</p>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-gray-400 hover:text-white"
                                      onClick={() => window.open(part.data, '_blank')}
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  </div>
                                  <img 
                                    src={part.data} 
                                    alt={fileName}
                                    className="w-full max-w-md rounded-lg border border-gray-500 cursor-pointer hover:border-gray-400 transition-colors"
                                    onClick={() => window.open(part.data, '_blank')}
                                  />
                                </div>
                              ) : (
                                // Enhanced Document Display
                                <div className="flex items-center gap-3">
                                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                                    isPDF ? 'bg-red-600' : 
                                    isDocument ? 'bg-blue-600' : 'bg-gray-600'
                                  }`}>
                                    <FileText className="w-6 h-6 text-white" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-white font-medium truncate">{fileName}</p>
                                    <p className="text-gray-400 text-sm">
                                      {isPDF ? 'PDF Document' : 
                                       isDocument ? 'Document' : 'File'}
                                    </p>
                                  </div>
                                  <div className="flex gap-2">
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-gray-400 hover:text-white"
                                      onClick={() => {
                                        const link = document.createElement('a');
                                        link.href = part.data;
                                        link.download = fileName;
                                        link.click();
                                      }}
                                    >
                                      <Download className="w-4 h-4" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-gray-400 hover:text-white"
                                      onClick={() => window.open(part.data, '_blank')}
                                    >
                                      <ExternalLink className="w-4 h-4" />
                                    </Button>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        }
                        return null;
                      })}
                    </div>
                  ) : (
                    <span className="text-white">{message.content}</span>
                  )}
                </div>
                {isUser && (
                  <div className="flex gap-1 mt-2 opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => {
                      const textContent = Array.isArray(message.content)
                        ? message.content.filter(p => p.type === 'text').map(p => p.text).join('\n')
                        : message.content;
                      navigator.clipboard.writeText(textContent);
                    }}>
                      <Copy className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => handleEditMessage(
                      message.id,
                      Array.isArray(message.content)
                        ? message.content.filter(p => p.type === 'text').map(p => p.text).join('\n')
                        : message.content
                    )}>
                      <Edit className="size-4" />
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
};

export default MessageContainer;
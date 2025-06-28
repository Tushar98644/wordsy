import { Copy, Edit, Download, ExternalLink, FileText, ImageIcon } from "lucide-react";
import { Button } from "../ui/button";

interface IFile {
  fileId: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

interface ContainerProps {
  messages: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;   
    timestamp: Date;
    files?: IFile[];
  }>;
  handleEditMessage: (id: string, content: string) => void;
  handleDeleteMessage: (id: string) => void;
  messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

const MessageContainer = ({ messages, handleEditMessage, handleDeleteMessage, messagesEndRef }: ContainerProps) => {

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
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
                  {/* Text Content */}
                  {message.content && (
                    <div className="text-white mb-3">
                      {message.content}
                    </div>
                  )}
                  
                  {/* Files */}
                  {message.files && message.files.length > 0 && (
                    <div className="space-y-3">
                      {message.files.map((file, idx) => {
                        const isImage = file.mimeType?.startsWith('image/');
                        const isPDF = file.mimeType?.includes('pdf');
                        const isDocument = file.mimeType?.includes('document') || file.mimeType?.includes('text');
                        
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
                                    <p className="text-white font-medium truncate">{file.fileName}</p>
                                    <div className="flex items-center gap-2 mt-1">
                                      <span className="text-xs text-gray-400">
                                        {formatFileSize(file.size)}
                                      </span>
                                      <span className="text-xs text-gray-500">Image</span>
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white"
                                    onClick={() => window.open(file.fileUrl, '_blank')}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </Button>
                                </div>
                                <img 
                                  src={file.fileUrl} 
                                  alt={file.fileName}
                                  className="w-full max-w-md rounded-lg border border-gray-500 cursor-pointer hover:border-gray-400 transition-colors"
                                  onClick={() => window.open(file.fileUrl, '_blank')}
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
                                  <p className="text-white font-medium truncate">{file.fileName}</p>
                                  <div className="flex items-center gap-2 mt-1">
                                    <span className="text-xs text-gray-400">
                                      {formatFileSize(file.size)}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                      {isPDF ? 'PDF Document' : 
                                       isDocument ? 'Document' : 'File'}
                                    </span>
                                  </div>
                                </div>
                                <div className="flex gap-2">
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white"
                                    onClick={() => {
                                      const link = document.createElement('a');
                                      link.href = file.fileUrl;
                                      link.download = file.fileName;
                                      link.click();
                                    }}
                                  >
                                    <Download className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="text-gray-400 hover:text-white"
                                    onClick={() => window.open(file.fileUrl, '_blank')}
                                  >
                                    <ExternalLink className="w-4 h-4" />
                                  </Button>
                                </div>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
                {isUser && (
                  <div className="flex gap-1 mt-2 opacity-0 hover:opacity-100 transition-opacity">
                    <Button size="icon" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => {
                      navigator.clipboard.writeText(message.content);
                    }}>
                      <Copy className="size-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-white/60 hover:text-white hover:bg-white/10" onClick={() => handleEditMessage(message.id, message.content)}>
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
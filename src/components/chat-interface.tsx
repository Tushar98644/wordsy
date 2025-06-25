'use client';

import { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  PenSquare,
  Search,
  Library,
  Sparkles,
  Grid3X3,
  Plus,
  Shuffle,
  Mic,
  MoreHorizontal,
  Crown,
  Maximize2,
  Info,
  ChevronDown,
  AudioLines,
  Settings,
  X,
  Edit,
  Trash,
} from 'lucide-react';

export default function ChatInterface() {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [file, setFile] = useState<File | null>(null);
  const [isEditing, setIsEditing] = useState<{ id: string; content: string } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputValue, setInputValue] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const chatHistory = [
    "React infinite re-render fix",
    "Next.js HTTP methods fix",
    "Application Confirmation and Ca...",
    "Stack Elements Vertically",
    "Mobile site blocker",
    "Backend Language Comparison",
    "Catrobat Sunbird UCI Summary",
    "ChatGPT Model Type",
  ];

  const handleNewChat = () => {
    setMessages([]);
    setSelectedChat(null);
    setInputValue('');
    setFile(null);
  };

  const handleChatSelect = (chat: string) => {
    setSelectedChat(chat);
    setMessages([]);
    setInputValue('');
    setFile(null);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim() && !file) return;
    
    const userMessage = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      file: file ? URL.createObjectURL(file) : null
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Add loading indicator
    const loadingMessage = {
      id: 'loading',
      role: 'assistant',
      content: '',
      isLoading: true
    };
    setMessages(prev => [...prev, loadingMessage]);
    
    setInputValue('');
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    
    try {
      setIsLoading(true);
      
      // In a real app, this would be an API call to your backend
      // Simulating API response delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove loading and add response
      setMessages(prev => 
        prev.filter(msg => msg.id !== 'loading')
          .concat({
            id: Date.now().toString(),
            role: 'assistant',
            content: `I received your message: "${inputValue}"${file ? ` and a ${file.type.split('/')[0]} file` : ''}`
          })
      );
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages(prev => prev.filter(msg => msg.id !== 'loading'));
    } finally {
      setIsLoading(false);
    }
  };

  const handleEditMessage = (message: any) => {
    setIsEditing({ id: message.id, content: message.content });
    setInputValue(message.content);
  };

  const handleSaveEdit = () => {
    if (!isEditing) return;
    
    setMessages(prev => 
      prev.map(m => 
        m.id === isEditing.id ? { ...m, content: inputValue } : m
      )
    );
    setIsEditing(null);
    setInputValue('');
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(prev => prev.filter(message => message.id !== id));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const removeFile = () => {
    setFile(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="flex h-screen bg-[#212121] text-white">
      {/* Sidebar */}
      <div className="w-[260px] bg-[#171717] flex flex-col border-r border-[#2f2f2f]">
        {/* Top section */}
        <div className="p-3 space-y-1">
          {/* ChatGPT logo */}
          <div className="flex items-center gap-3 px-3 py-2">
            <div className="w-6 h-6 bg-white rounded-sm flex items-center justify-center">
              <div className="w-4 h-4 bg-black rounded-full"></div>
            </div>
          </div>

          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg h-11 px-3"
            onClick={handleNewChat}
          >
            <PenSquare className="w-4 h-4 mr-3" />
            New chat
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg h-11 px-3"
          >
            <Search className="w-4 h-4 mr-3" />
            Search chats
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg h-11 px-3"
          >
            <Library className="w-4 h-4 mr-3" />
            Library
          </Button>
        </div>

        <div className="border-t border-[#2f2f2f] p-3 space-y-1">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg h-11 px-3"
          >
            <Sparkles className="w-4 h-4 mr-3" />
            Sora
          </Button>

          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg h-11 px-3"
          >
            <Grid3X3 className="w-4 h-4 mr-3" />
            GPTs
          </Button>
        </div>

        {/* Chat history */}
        <div className="flex-1 p-3 overflow-y-auto">
          <h3 className="text-xs font-medium text-gray-500 mb-2 px-3 uppercase tracking-wider">Chats</h3>
          <div className="space-y-1">
            {chatHistory.map((chat, index) => (
              <button
                key={index}
                onClick={() => handleChatSelect(chat)}
                className={`w-full text-left text-sm text-gray-300 hover:bg-[#2f2f2f] rounded-lg p-3 truncate transition-colors ${
                  selectedChat === chat ? "bg-[#2f2f2f]" : ""
                }`}
              >
                {chat}
              </button>
            ))}
          </div>
        </div>

        {/* Bottom section */}
        <div className="p-3 border-t border-[#2f2f2f]">
          <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-[#2f2f2f] rounded-lg p-3">
            <Settings className="w-4 h-4 mr-3" />
            <div className="flex flex-col items-start">
              <span className="text-sm">Upgrade plan</span>
              <span className="text-xs text-gray-500">More access to the best models</span>
            </div>
          </Button>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#2f2f2f]">
          <div className="flex items-center gap-4">
            <div className="w-6 h-6 bg-[#404040] rounded"></div>
            <div className="flex items-center gap-2">
              <span className="font-medium text-lg">ChatGPT</span>
              <ChevronDown className="w-4 h-4 text-gray-400" />
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <span>Saved memory full</span>
              <Info className="w-4 h-4" />
            </div>
            <Button className="bg-[#6366f1] hover:bg-[#5855eb] text-white px-4 py-2 rounded-lg flex items-center gap-2 h-9">
              <Crown className="w-4 h-4" />
              Get Plus
            </Button>
            <Button variant="ghost" className="text-gray-400 hover:bg-[#2f2f2f] p-2 rounded-lg">
              <Maximize2 className="w-4 h-4" />
            </Button>
            <div className="w-8 h-8 bg-[#22c55e] rounded-full flex items-center justify-center text-sm font-medium">
              T
            </div>
          </div>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {messages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8">
              <h1 className="text-[40px] font-normal text-center mb-12 text-white leading-tight">
                Where should we begin?
              </h1>

              <div className="w-full max-w-4xl">
                {/* Top controls */}
                <div className="flex items-center justify-between mb-6">
                  <Button
                    variant="outline"
                    className="bg-[#2f2f2f] text-gray-400 border-[#404040] hover:bg-[#404040] rounded-2xl px-5 py-3 flex items-center gap-3 text-[16px] h-[52px]"
                  >
                    <div className="w-7 h-7 rounded-full bg-gray-600 flex items-center justify-center">
                      <span className="text-sm text-white font-medium">M</span>
                    </div>
                    Talk to Mia
                  </Button>

                  <div className="flex items-center gap-3">
                    <Button
                      variant="outline"
                      className="bg-[#2f2f2f] text-gray-400 border-[#404040] hover:bg-[#404040] rounded-2xl px-5 py-3 flex items-center gap-3 text-[16px] h-[52px]"
                    >
                      <span className="text-xl">🇬🇧</span>
                      English (UK)
                      <ChevronDown className="w-4 h-4" />
                    </Button>

                    <Button
                      variant="outline"
                      className="bg-[#2f2f2f] text-gray-400 border-[#404040] hover:bg-[#404040] rounded-2xl w-[52px] h-[52px] flex items-center justify-center"
                    >
                      <MoreHorizontal className="w-5 h-5" />
                    </Button>

                    <Button className="bg-[#4f46e5] hover:bg-[#4338ca] text-white rounded-2xl w-[52px] h-[52px] flex items-center justify-center">
                      <Mic className="w-5 h-5" />
                    </Button>
                  </div>
                </div>

                {/* Chat input */}
                <div className="relative">
                  <div className="relative bg-[#2f2f2f] rounded-[32px] border border-[#404040] mb-4">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask anything"
                      className="w-full bg-transparent border-0 text-white placeholder-gray-500 text-[18px] px-8 py-6 focus:ring-0 focus:outline-none rounded-[32px] min-h-[80px] resize-none"
                    />

                    {/* Bottom input controls */}
                    <div className="absolute left-6 bottom-4 flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Plus className="w-5 h-5" />
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                      </Button>

                      <Button
                        variant="ghost"
                        className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg flex items-center gap-2"
                      >
                        <Shuffle className="w-4 h-4" />
                        <span className="text-sm">Tools</span>
                      </Button>
                    </div>

                    <div className="absolute right-6 bottom-4 flex items-center gap-2">
                      <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg">
                        <Mic className="w-5 h-5" />
                      </Button>

                      <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg">
                        <AudioLines className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>

                  {/* Send button (appears when typing) */}
                  {(inputValue.trim() || file) && (
                    <Button
                      onClick={handleSendMessage}
                      className="absolute right-6 bottom-8 bg-white text-black hover:bg-gray-100 rounded-full w-8 h-8 p-0 flex items-center justify-center"
                    >
                      <span className="text-lg">→</span>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ) : (
            <>
              {/* Messages container */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6 max-w-4xl mx-auto">
                  {messages.map((message) => (
                    <div 
                      key={message.id} 
                      className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-3xl px-4 py-3 rounded-2xl ${
                        message.role === 'user' 
                          ? 'bg-[#4f46e5] text-white rounded-br-none' 
                          : 'bg-[#2f2f2f] text-gray-200 rounded-bl-none'
                      }`}>
                        {message.isLoading ? (
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                          </div>
                        ) : (
                          <>
                            {message.file && (
                              <div className="mb-2">
                                {message.file.type.startsWith('image') ? (
                                  <img 
                                    src={message.file} 
                                    alt="Uploaded" 
                                    className="max-w-xs rounded-lg"
                                  />
                                ) : (
                                  <div className="flex items-center gap-2 p-2 bg-[#3f3f3f] rounded">
                                    <div className="bg-gray-500 w-8 h-8 rounded flex items-center justify-center">
                                      <span className="text-xs">DOC</span>
                                    </div>
                                    <span className="text-sm truncate max-w-xs">
                                      {file?.name || 'Uploaded file'}
                                    </span>
                                  </div>
                                )}
                              </div>
                            )}
                            {message.content}
                          </>
                        )}
                        
                        {/* Message actions */}
                        {message.role === 'user' && !message.isLoading && (
                          <div className="flex justify-end mt-2">
                            <Button 
                              variant="ghost"
                              className="text-gray-300 hover:text-white hover:bg-[#404040] p-1 rounded-lg"
                              onClick={() => handleEditMessage(message)}
                            >
                              <Edit className="w-4 h-4" />
                            </Button>
                            <Button 
                              variant="ghost"
                              className="text-gray-300 hover:text-white hover:bg-[#404040] p-1 rounded-lg"
                              onClick={() => handleDeleteMessage(message.id)}
                            >
                              <Trash className="w-4 h-4" />
                            </Button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Input area */}
              <div className="p-4 border-t border-[#2f2f2f]">
                {isEditing && (
                  <div className="mb-4 p-3 bg-[#2f2f2f] rounded-lg flex justify-between items-center">
                    <span className="text-gray-400">Editing message</span>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline"
                        className="text-gray-300 hover:bg-[#404040]"
                        onClick={() => setIsEditing(null)}
                      >
                        Cancel
                      </Button>
                      <Button 
                        className="bg-[#4f46e5] hover:bg-[#4338ca]"
                        onClick={handleSaveEdit}
                      >
                        Save & Resend
                      </Button>
                    </div>
                  </div>
                )}
                
                {file && (
                  <div className="mb-2 flex items-center justify-between p-2 bg-[#2f2f2f] rounded-lg">
                    <div className="flex items-center gap-2">
                      <div className="bg-gray-500 w-8 h-8 rounded flex items-center justify-center">
                        <span className="text-xs">
                          {file.type.startsWith('image') ? 'IMG' : 'DOC'}
                        </span>
                      </div>
                      <span className="text-sm text-gray-400 truncate max-w-xs">{file.name}</span>
                    </div>
                    <Button 
                      variant="ghost"
                      className="text-gray-400 hover:text-white p-1"
                      onClick={removeFile}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                )}
                
                <div className="relative">
                  <div className="relative bg-[#2f2f2f] rounded-[32px] border border-[#404040]">
                    <Input
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      placeholder="Ask anything"
                      className="w-full bg-transparent border-0 text-white placeholder-gray-500 text-[18px] px-8 py-6 focus:ring-0 focus:outline-none rounded-[32px] min-h-[80px] resize-none"
                    />
                    
                    <div className="absolute left-6 bottom-4 flex items-center gap-4">
                      <Button 
                        variant="ghost" 
                        className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg"
                        onClick={() => fileInputRef.current?.click()}
                      >
                        <Plus className="w-5 h-5" />
                        <input
                          type="file"
                          ref={fileInputRef}
                          className="hidden"
                          onChange={handleFileChange}
                          accept="image/*,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg flex items-center gap-2"
                      >
                        <Shuffle className="w-4 h-4" />
                        <span className="text-sm">Tools</span>
                      </Button>
                    </div>
                    
                    <div className="absolute right-6 bottom-4 flex items-center gap-2">
                      <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg">
                        <Mic className="w-5 h-5" />
                      </Button>
                      
                      <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg">
                        <AudioLines className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading}
                    className={`absolute right-6 bottom-8 ${
                      isLoading ? 'bg-gray-500' : 'bg-white hover:bg-gray-100'
                    } text-black rounded-full w-8 h-8 p-0 flex items-center justify-center`}
                  >
                    {isLoading ? (
                      <div className="flex space-x-1">
                        <div className="w-1 h-1 bg-black rounded-full animate-bounce"></div>
                        <div className="w-1 h-1 bg-black rounded-full animate-bounce delay-75"></div>
                        <div className="w-1 h-1 bg-black rounded-full animate-bounce delay-150"></div>
                      </div>
                    ) : (
                      <span className="text-lg">→</span>
                    )}
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
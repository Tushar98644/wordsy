"use client";

import { useRef, useEffect } from "react";
import Sidebar from "./sidebar";
import ChatHeader from "./chat-area/header";
import ChatInput from "./chat-area/chat-input";
import MessageContainer from "./chat-area/message-container";
import { useUser } from "@clerk/nextjs";
import { useFileUpload } from "@/hooks/useFileUpload";
import { useChatManager } from "@/hooks/useChatManager";
import { useMessageActions } from "@/hooks/useMessageActions";

const ChatInterface = () => {
  const { user } = useUser();
  const { file, fileUrl, fileType, fileInputRef, isUploading, handleFileChange, removeFile } = useFileUpload();

  const { chatId, setChatId, messages, input, setInput, handleInputChange, handleSubmit, setMessages, resetChat } = useChatManager({
    userId: user?.id || null,
    fileUrl,
    fileType,
  });

  const { isEditing, setIsEditing, handleEditMessage, handleDeleteMessage, handleSaveEdit } = useMessageActions({ messages, setMessages, chatId });
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form) {
        handleSubmit({ preventDefault: () => {}, currentTarget: form } as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex h-screen bg-[#212121] text-white">
      <Sidebar
        resetChat={resetChat}
        setMessages={setMessages}
        setChatId={setChatId}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <ChatHeader />

        {/* Chat area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {messages.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center px-4">
              <h1 className="text-[40px] font-normal text-center mb-12 text-white leading-tight">
                Where should we begin?
              </h1>
              <div className="w-full max-w-4xl">
                <ChatInput
                  input={input}
                  handleInputChange={handleInputChange}
                  handleKeyPress={handleKeyPress}
                  handleSubmit={handleSubmit}
                  fileInputRef={fileInputRef} 
                  handleFileChange={handleFileChange}
                  file={file}
                  fileUrl={fileUrl}
                  isUploading={isUploading}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  handleSaveEdit={handleSaveEdit}
                  removeFile={removeFile}
                />
              </div>
            </div>
          ) : (
            <div className="flex flex-col flex-1 overflow-hidden">
              <div className="flex-1 overflow-auto">
                <MessageContainer
                  messages={messages}
                  handleEditMessage={handleEditMessage}
                  handleDeleteMessage={handleDeleteMessage}
                  messagesEndRef={messagesEndRef}
                />
              </div>
              <div className="flex-shrink-0 w-full max-w-4xl mx-auto p-4">
                <ChatInput
                  input={input}
                  handleInputChange={handleInputChange}
                  handleKeyPress={handleKeyPress}
                  handleSubmit={handleSubmit}
                  fileInputRef={fileInputRef}
                  handleFileChange={handleFileChange}
                  file={file}
                  fileUrl={fileUrl}
                  isUploading={isUploading}
                  isEditing={isEditing}
                  setIsEditing={setIsEditing}
                  handleSaveEdit={handleSaveEdit}
                  removeFile={removeFile}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
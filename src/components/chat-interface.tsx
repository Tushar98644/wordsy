'use client';

import { useChat } from '@ai-sdk/react';
import { useState, useRef, useEffect } from 'react';
import Sidebar from './sidebar';
import ChatHeader from './chat-area/header';
import ChatInput from './chat-area/chat-input';
import MessageContainer from './chat-area/message-container';

export default function ChatInterface() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<{ id: string; content: string } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const userId = "user_123";

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    setMessages,
  } = useChat({
    api: '/api/v1/chat',
    body: { userId },
    onFinish: () => {
      // clear states after assistant response
      setFile(null);
      setFileUrl(null);
      setFileType(null);
      setInput('');
    }
  });

  // Custom submit to push user message immediately
  const handleUserSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && !fileUrl) return;

    // create structured content
    const userMessage = {
      id: crypto.randomUUID(),
      role: 'user' as const,
      content: fileUrl && fileType
        ? `${input.trim()}\n[File](${fileUrl})`
        : input.trim(),
    };

    // optimistic UI update
    setMessages(prev => [...prev, userMessage]);

    // reset input/file
    setInput('');
    setFile(null);
    setFileUrl(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';

    // call the SDK submit which sends to API and appends assistant response
    handleSubmit(e);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleUserSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
    }
  };
  
  const handleEditMessage = (id: string, content: string) => {
    setIsEditing({ id, content });
    setInput(content);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter(msg => msg.id !== id));
  };

   const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;

    setMessages(messages.map(m =>
      m.id === isEditing.id ? { ...m, content: input } : m
    ));

    setIsEditing(null);
    setInput('');
    setFile(null);
    setFileUrl(null);
  };

  async function uploadFileToAPI(file: File) {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/v1/upload", { method: "POST", body: form });
    const json = await res.json();
    return { url: json.imgUrl as string, type: json.fileType as string };
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const selectedFile = e.target.files[0];
    setIsUploading(true);

    try {
      const { url, type } = await uploadFileToAPI(selectedFile);
      setFile(selectedFile);
      setFileUrl(url);
      setFileType(type);
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFileUrl(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex h-screen bg-[#212121] text-white">
      <Sidebar setInput={setInput} setMessages={setMessages} setFile={setFile} setFileUrl={setFileUrl} />

      {/* Main content */}
      <div className="flex-1 flex flex-col">
        <ChatHeader />

        {/* Chat area */}
        <div className="flex-1 flex flex-col overflow-scroll">
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
                  handleSubmit={handleUserSubmit}
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
            <>
              <MessageContainer
                messages={messages}
                handleEditMessage={handleEditMessage}
                handleDeleteMessage={handleDeleteMessage}
                messagesEndRef={messagesEndRef} />
              <div className="w-full max-w-4xl mx-auto justify-self-end items-end">
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
                  removeFile={removeFile} />
              </div></>
          )}
        </div>
      </div>
    </div>
  );
}
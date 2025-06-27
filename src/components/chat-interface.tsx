"use client";

import { useChat } from "@ai-sdk/react";
import { useState, useRef, useEffect } from "react";
import Sidebar from "./sidebar";
import ChatHeader from "./chat-area/header";
import ChatInput from "./chat-area/chat-input";
import MessageContainer from "./chat-area/message-container";
import { useUser } from "@clerk/nextjs";

export default function ChatInterface() {
  const { user } = useUser();
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<{
    id: string;
    content: string;
  } | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [chatId, setChatId] = useState<string | null>(null);

  const {
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    setMessages,
    append,
  } = useChat({
    api: "/api/v1/chat",
    body: { 
      userId: user?.id || null,
      chatId,
      fileUrl: fileUrl || undefined,
      fileType: fileType || undefined,
    },
    onFinish: () => {
      setInput("");
      setFile(null);
      setFileUrl(null);
      setFileType(null);
    },
  });

  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && !fileUrl) return;
    if (!user?.id) return;

    try {
      let currentChatId = chatId;
      
      // If no chatId exists, create a new chat first
      if (!currentChatId) {
        const chatRes = await fetch("/api/v1/chats/create", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: input.trim().slice(0, 50) || "New Chat",
            userId: user.id,
          }),
        });

        if (chatRes.ok) {
          const { chatId: newChatId } = await chatRes.json();
          currentChatId = newChatId;
          setChatId(newChatId);
          
          // Use append method for the first message with the new chatId
          await append({
            role: "user",
            content: input,
          }, {
            body: {
              userId: user.id,
              chatId: currentChatId,
              fileUrl: fileUrl || undefined,
              fileType: fileType || undefined,
            }
          });
          
          // Clear the input and file states
          setInput("");
          setFile(null);
          setFileUrl(null);
          setFileType(null);
          return;
        }
      }

      // For subsequent messages, use the regular handleSubmit
      handleSubmit(e);

    } catch (error) {
      console.error("Error in submit:", error);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const form = e.currentTarget.closest('form');
      if (form) {
        handleCustomSubmit({ preventDefault: () => {}, currentTarget: form } as React.FormEvent<HTMLFormElement>);
      }
    }
  };

  const handleEditMessage = (id: string, content: string) => {
    setIsEditing({ id, content });
    setInput(content);
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;

    setMessages(
      messages.map((m) =>
        m.id === isEditing.id ? { ...m, content: input } : m
      )
    );

    setIsEditing(null);
    setInput("");
    setFile(null);
    setFileUrl(null);
    setFileType(null);

    if (chatId) {
      try {
        await fetch(`/api/v1/chats/messages/${isEditing.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ content: input }),
        });
      } catch (error) {
        console.error("Failed to update message:", error);
      }
    }
  };

  async function uploadFileToAPI(file: File) {
    const form = new FormData();
    form.append("file", file);

    const res = await fetch("/api/v1/upload", { method: "POST", body: form });
    if (!res.ok) throw new Error("Upload failed");
    
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
      console.error("Upload failed:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFileUrl(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const messagesEndRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setFile(null);
    setFileUrl(null);
    setFileType(null);
    setChatId(null);
  };

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
                  handleSubmit={handleCustomSubmit}
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
                  handleSubmit={handleCustomSubmit}
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
}
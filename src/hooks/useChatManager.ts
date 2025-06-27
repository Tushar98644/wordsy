import { useChat } from "@ai-sdk/react";
import { useState } from "react";

type ChatManagerProps = {
  userId: string | null;
  fileUrl: string | null;
  fileType: string | null;
};

export function useChatManager({ userId, fileUrl, fileType }: ChatManagerProps) {
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
      userId,
      chatId,
      fileUrl: fileUrl || undefined,
      fileType: fileType || undefined,
    },
    onFinish: () => {
      setInput("");
    },
  });

  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && !fileUrl) return;
    if (!userId) return;

    let currentChatId = chatId;

    if (!currentChatId) {
      const chatRes = await fetch("/api/v1/chats/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: input.trim().slice(0, 50) || "New Chat",
          userId,
        }),
      });

      if (chatRes.ok) {
        const { chatId: newChatId } = await chatRes.json();
        currentChatId = newChatId;
        setChatId(newChatId);

        await append(
          {
            role: "user",
            content: input,
          },
          {
            body: {
              userId,
              chatId: currentChatId,
              fileUrl: fileUrl || undefined,
              fileType: fileType || undefined,
            },
          }
        );

        setInput("");
        return;
      }
    }

    handleSubmit(e);
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setChatId(null);
  };

  return {
    chatId,
    setChatId,
    messages,
    input,
    setInput,
    handleInputChange,
    handleSubmit: handleCustomSubmit,
    setMessages,
    append,
    resetChat,
  };
}
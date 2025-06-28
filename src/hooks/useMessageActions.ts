import axios from "axios";
import { useState } from "react";

export function useMessageActions({
  messages,
  setMessages,
  chatId,
}: {
  messages: any[];
  setMessages: (messages: any[]) => void;
  chatId: string | null;
}) {
  const [isEditing, setIsEditing] = useState<{ id: string; content: string } | null>(null);

  const handleEditMessage = (id: string, content: string) => {
    setIsEditing({ id, content });
  };

  const handleDeleteMessage = (id: string) => {
    setMessages(messages.filter((msg) => msg.id !== id));
  };

  const handleSaveEdit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isEditing) return;

    setMessages(
      messages.map((m) =>
        m.id === isEditing.id ? { ...m, content: isEditing.content } : m
      )
    );

    if (chatId) {
      try {
        await axios.patch(`/api/v1/chats/messages/${isEditing.id}`, {
          content: isEditing.content,
        }, {
          headers: { "Content-Type": "application/json" },
        });
      } catch (error) {
        console.error("Failed to update message:", error);
      }
    }

    setIsEditing(null);
  };

  return {
    isEditing,
    setIsEditing,
    handleEditMessage,
    handleDeleteMessage,
    handleSaveEdit,
  };
}
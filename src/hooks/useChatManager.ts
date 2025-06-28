import axios from "axios";
import { useState } from "react";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt?: Date;
};

type ChatManagerProps = {
  userId: string | null;
  fileUrl: string | null;
  fileType: string | null;
};

export function useChatManager({ userId, fileUrl, fileType }: ChatManagerProps) {
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const addMessage = (message: Omit<Message, "id">) => {
    const newMessage: Message = {
      ...message,
      id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
      createdAt: new Date(),
    };
    setMessages(prev => [...prev, newMessage]);
    return newMessage;
  };

  const handleCustomSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!input.trim() && !fileUrl) return;
    if (!userId) return;
    if (isLoading) return; // Prevent multiple submissions

    setIsLoading(true);
    let currentChatId = chatId;

    try {
      // Create chat if it doesn't exist
      if (!currentChatId) {
        const chatRes = await axios.post("/api/v1/chats/create", {
          title: input.trim().slice(0, 50) || "New Chat",
          userId,
        });

        if (chatRes.data?.chatId) {
          currentChatId = chatRes.data.chatId;
          setChatId(currentChatId);
        } else {
          throw new Error("Failed to create chat");
        }
      }

      // Add user message to UI
      const userMessage = addMessage({
        role: "user",
        content: input,
      });

      // Clear input immediately
      const currentInput = input;
      setInput("");

      // Send message to API
      const response = await axios.post("/api/v1/chat", {
        messages: [...messages, userMessage],
        userId,
        chatId: currentChatId,
        fileUrl: fileUrl || undefined,
        fileType: fileType || undefined,
      });

      // Handle streaming response format
      let assistantContent = "";
      
      if (typeof response.data === 'string') {
        // Parse streaming response format
        const lines = response.data.split('\n');
        for (const line of lines) {
          if (line.trim().startsWith('0:"')) {
            // Extract content from streaming chunks
            const match = line.match(/0:"(.*)"/);
            if (match) {
              assistantContent += match[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
          }
        }
      } else if (response.data?.content) {
        assistantContent = response.data.content;
      } else if (response.data?.message) {
        assistantContent = response.data.message;
      }

      // Add assistant response to UI
      if (assistantContent) {
        addMessage({
          role: "assistant",
          content: assistantContent,
        });
      } else {
        addMessage({
          role: "assistant",
          content: "I received your message but couldn't process the response properly.",
        });
      }

    } catch (error) {
      console.error("Chat error:", error);
      
      // Add error message to UI
      addMessage({
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      });
      
      // Restore input if there was an error
      if (input === "") {
        setInput(input);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const append = async (message: Omit<Message, "id">, options?: { body?: any }) => {
    if (isLoading) return;
    
    setIsLoading(true);
    
    try {
      // Add user message
      const userMessage = addMessage(message);
      
      // Send to API
      const response = await axios.post("/api/v1/chat", {
        messages: [...messages, userMessage],
        ...options?.body,
      });

      // Handle streaming response format
      let assistantContent = "";
      
      if (typeof response.data === 'string') {
        // Parse streaming response format
        const lines = response.data.split('\n');
        for (const line of lines) {
          if (line.trim().startsWith('0:"')) {
            // Extract content from streaming chunks
            const match = line.match(/0:"(.*)"/);
            if (match) {
              assistantContent += match[1].replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }
          }
        }
      } else if (response.data?.content) {
        assistantContent = response.data.content;
      }

      // Add assistant response
      if (assistantContent) {
        addMessage({
          role: "assistant",
          content: assistantContent,
        });
      }
    } catch (error) {
      console.error("Append error:", error);
      addMessage({
        role: "assistant",
        content: "Sorry, I encountered an error. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const resetChat = () => {
    setMessages([]);
    setInput("");
    setChatId(null);
    setIsLoading(false);
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
    isLoading,
    setIsLoading,
  };
}
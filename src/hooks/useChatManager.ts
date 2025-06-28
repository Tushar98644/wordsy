import { useChat } from "@ai-sdk/react";
import axios from "axios";
import { useState, useMemo } from "react";

interface FileMetadata {
  fileId: string;
  fileName: string;
  mimeType: string;
  size: number;
}

interface IFile {
  fileId: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

type ChatManagerProps = {
  userId: string | null;
  fileUrl: string | null;
  fileMetadata: FileMetadata | null;
};

export function useChatManager({ userId, fileUrl, fileMetadata }: ChatManagerProps) {
  const [chatId, setChatId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    messages: rawMessages,
    input,
    setInput,
    handleInputChange,
    handleSubmit,
    setMessages: setRawMessages,
    append,
  } = useChat({
    api: "/api/v1/chat",
    body: {
      userId,
      chatId,
      fileUrl: fileUrl || undefined,
      fileMetadata: fileMetadata || undefined,
    },
    onFinish: () => {
      setInput("");
      setIsLoading(false);
    },
  });

  // Transform messages to include timestamp and filter out unwanted properties
  const messages = useMemo(() => {
    return rawMessages
      .filter((message) => message.role !== "data") // Filter out data messages
      .map((message) => ({
        id: message.id,
        role: message.role as "user" | "assistant" | "system",
        content: message.content,
        timestamp: new Date(),
        files: (message as any).files as IFile[] | undefined,
      }));
  }, [rawMessages]);

  const setMessages = (newMessages: Array<{
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    files?: IFile[];
  }>) => {
    // Transform back to UIMessage format, filtering out timestamp
    const transformedMessages = newMessages.map(({ timestamp, ...rest }) => ({
      ...rest,
      createdAt: timestamp, // Store timestamp as createdAt if needed
    }));
    setRawMessages(transformedMessages as any); // Type assertion needed due to UIMessage complexity
  };

  const createFileAttachment = (): IFile | undefined => {
    if (!fileUrl || !fileMetadata) return undefined;
        
    return {
      fileId: fileMetadata.fileId,
      fileName: fileMetadata.fileName,
      fileUrl: fileUrl,
      mimeType: fileMetadata.mimeType,
      size: fileMetadata.size,
      uploadedAt: new Date(),
    };
  };

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() && !fileUrl) return;
    if (!userId) return;

    let currentChatId = chatId;
    const fileAttachment = createFileAttachment();

    if (!currentChatId) {
      setIsLoading(true);
            
      try {
        const chatRes = await axios.post("/api/v1/chats/create", {
          title: input.trim().slice(0, 50) || "New Chat",
          userId,
        });
                
        if (chatRes.status === 200) {
          const { chatId: newChatId } = chatRes.data;
          currentChatId = newChatId;
          setChatId(newChatId);

          const userMessage = {
            role: "user" as const,
            content: input,
            files: fileAttachment ? [fileAttachment] : [],
          };

          await append(userMessage, {
            body: {
              userId,
              chatId: currentChatId,
              fileUrl: fileUrl || undefined,
              fileMetadata: fileMetadata || undefined,
            },
          });
           
          setInput("");
          return;
        } else {
          throw new Error('Failed to create chat');
        }
      } catch (error) {
        console.error('Chat creation error:', error);
        setIsLoading(false);
      }
    } else {
      setIsLoading(true);
            
      try {
        const userMessage = {
          role: "user" as const,
          content: input,
          files: fileAttachment ? [fileAttachment] : [],
        };
            
        await append(userMessage, {
          body: {
            userId,
            chatId: currentChatId,
            fileUrl: fileUrl || undefined,
            fileMetadata: fileMetadata || undefined,
          },
        });

        setInput("");
      } catch (error) {
        console.error('Message send error:', error);
        setIsLoading(false);
      }
    }
  };

  const resetChat = () => {
    setRawMessages([]);
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
    isLoading,
    setIsLoading,
  };
}
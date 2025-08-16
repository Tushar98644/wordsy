import { useMutation, useQueryClient } from "@tanstack/react-query";
import { readDataStream } from "ai";
import { useState } from "react";

export const useChatStream = () => {
  const queryClient = useQueryClient();
  const [streamingMessage, setStreamingMessage] = useState("");
  const [isStreaming, setIsStreaming] = useState(false);

  const mutation = useMutation({
    mutationFn: async ({ threadId, message, fileUrl, fileMetadata }: { 
      threadId: string; 
      message: { role: 'user' | 'assistant'; content: string };
      fileUrl?: string;
      fileMetadata?: any;
    }) => {
      setIsStreaming(true);
      setStreamingMessage("");

      const response = await fetch('/api/v1/chat', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json' 
        },
        body: JSON.stringify({ 
          threadId,
          message,
          ...(fileUrl && { fileUrl }),
          ...(fileMetadata && { fileMetadata })
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      let fullMessage = "";
      
      await readDataStream(response.body!, {
        onText: (text) => {
          fullMessage += text;
          setStreamingMessage(fullMessage);
        },
        onFinish: () => {
          setIsStreaming(false);
        },
      });

      return fullMessage;
    },

    onSuccess: (_data, variables) => {
      setStreamingMessage("");
      queryClient.invalidateQueries({ queryKey: ["thread", variables.threadId] });
    },

    onError: (err) => {
      console.error("Chat stream failed", err);
      setIsStreaming(false);
      setStreamingMessage("");
    },
  });

  return {
    sendMessage: mutation.mutate,
    isStreaming,
    streamingMessage,
    isLoading: mutation.isPending,
  };
};

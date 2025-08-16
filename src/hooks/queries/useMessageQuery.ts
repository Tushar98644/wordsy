import { messageService } from "@/services/messageService";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useSendMessage = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ threadId, message }: { threadId: string; message: any }) =>
      messageService.sendMessage(threadId, message),

    onSuccess: (_data, variables) => {
      queryClient.invalidateQueries({ queryKey: ["thread", variables.threadId] });
    },

    onError: (err) => {
      console.error("send failed", err);
    },
  });
};

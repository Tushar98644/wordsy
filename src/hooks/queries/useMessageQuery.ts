import { messageService } from "@/services/messageService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMessages = (threadId: string) => {
  return useQuery({
    queryKey: ["messages", threadId],
    queryFn: () => messageService.getMessages(threadId),
  });
};
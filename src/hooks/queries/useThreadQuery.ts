import { threadService } from "@/services/threadService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchThreads = (userEmail: string) => {
  return useQuery({
    queryKey: ["threads", userEmail],
    queryFn: () => threadService.getAllThreads(userEmail),
    enabled: !!userEmail,
    staleTime: 1000 * 60 * 5,
  });
};

export const useDeleteAllThreads = () => {
  const queryClient =  useQueryClient();

  return useMutation({
    mutationFn: (userEmail: string) => threadService.deleteAllThreads(userEmail),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });
};

export const useDeleteThread = () => {
  const queryClient =  useQueryClient();

  return useMutation({
    mutationFn: (threadId: string) => threadService.deleteThread(threadId),
    // onSuccess: () => {
    //   queryClient.invalidateQueries({ queryKey: ["threads"] });
    // },
  });
};

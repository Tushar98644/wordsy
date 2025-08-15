import { threadService } from "@/services/threadService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFetchThreads = () => {
  return useQuery({
    queryKey: ["threads"],
    queryFn: () => threadService.getAllThreads(),
    staleTime: 1000 * 60 * 5,
  });
};

export const useFetchThread = (threadId: string) => {
  return useQuery({
    queryKey: ["thread", threadId],
    queryFn: () => threadService.getThread(threadId),
    staleTime: 1000 * 60 * 5,
  });
}

export const useEditThread = () => {
  const queryClient =  useQueryClient();

  return useMutation({
    mutationFn: ({ threadId, newTitle }: { threadId: string; newTitle: string }) => 
    threadService.editThread(threadId, newTitle),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });
}

export const useDeleteAllThreads = () => {
  const queryClient =  useQueryClient();

  return useMutation({
    mutationFn: () => threadService.deleteAllThreads(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });
};

export const useDeleteThread = () => {
  const queryClient =  useQueryClient();

  return useMutation({
    mutationFn: (threadId: string) => threadService.deleteThread(threadId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["threads"] });
    },
  });
};

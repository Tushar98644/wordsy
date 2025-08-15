import { chatService } from "@/services/chatService";
import { useQuery } from "@tanstack/react-query";

export const useFetchThreads = () => {
    return useQuery({
        queryKey: ["threads"],
        queryFn: chatService.getAllThreads,
        staleTime: 1000 * 60 * 5,
    });
};

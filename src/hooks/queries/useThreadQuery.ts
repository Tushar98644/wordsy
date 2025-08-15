import { threadService } from "@/services/threadService";
import { useQuery } from "@tanstack/react-query";

export const useFetchThreads = (userId: string) => {
    return useQuery({
        queryKey: ["threads", userId],
        queryFn: () => threadService.getAllThreads(userId),
        enabled: !!userId,
        staleTime: 1000 * 60 * 5,
    });
};

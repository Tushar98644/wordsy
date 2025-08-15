'use client'

import { useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronUp, MoreHorizontal, Trash } from "lucide-react";
import {
    SidebarGroupLabel,
    SidebarMenuSub,
    SidebarGroupContent,
    SidebarMenu,
    SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
    SidebarGroup,
    SidebarMenuAction,
    SidebarMenuButton,
    SidebarMenuSkeleton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ThreadDropdown } from "@/components/ui/thread-dropdown";
import { TextShimmer } from "@/components/ui/text-shimmer";
import { useDeleteAllThreads, useFetchThreads } from "@/hooks/queries/useThreadQuery";
import { useSession } from "@/config/auth/client";

type ThreadGroup = {
    label: string;
    threads: any[];
};

const MAX_THREADS_COUNT = 2;

export function AppSidebarThreads() {
    const [isExpanded, setIsExpanded] = useState(false);

    const { data: session } = useSession();
    const userEmail = session?.user?.email;

    const { data: threadList, isLoading } = useFetchThreads();
    const { mutate } = useDeleteAllThreads();

    const hasExcessThreads = threadList?.length ?? 0 >= MAX_THREADS_COUNT;

    const displayThreadList = useMemo(() => {
        if (!threadList) return [];
        if (!isExpanded && hasExcessThreads) return threadList.slice(0, MAX_THREADS_COUNT);
        return threadList;
    }, [threadList, hasExcessThreads, isExpanded]);

    const groups = useMemo<ThreadGroup[]>(() => {
        if (!displayThreadList?.length) return [];

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);

        const lastWeek = new Date(today);
        lastWeek.setDate(lastWeek.getDate() - 7);

        const buckets: ThreadGroup[] = [
            { label: "today", threads: [] },
            { label: "yesterday", threads: [] },
            { label: "lastWeek", threads: [] },
            { label: "older", threads: [] },
        ];

        for (const thread of displayThreadList) {
            const d =
                (thread?.updatedAt
                    ? new Date(thread?.updatedAt)
                    : new Date(thread.createdAt)) || new Date();
            d.setHours(0, 0, 0, 0);

            if (d.getTime() === today.getTime()) buckets[0].threads.push(thread);
            else if (d.getTime() === yesterday.getTime()) buckets[1].threads.push(thread);
            else if (d.getTime() >= lastWeek.getTime()) buckets[2].threads.push(thread);
            else buckets[3].threads.push(thread);
        }

        return buckets.filter((g) => g.threads.length > 0);
    }, [displayThreadList]);

    if (isLoading || !threadList) {
        return (
            <SidebarGroup>
                <SidebarGroupContent className="group-data-[collapsible=icon]:hidden group/threads">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarGroupLabel>
                                <h4 className="text-xs text-muted-foreground">Recent Chats</h4>
                            </SidebarGroupLabel>
                            {Array.from({ length: 12 }).map((_, i) => (
                                <SidebarMenuSkeleton key={i} />
                            ))}
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        );
    }

    if (!threadList?.length) {
        return (
            <SidebarGroup>
                <SidebarGroupContent className="group-data-[collapsible=icon]:hidden group/threads">
                    <SidebarMenu>
                        <SidebarMenuItem>
                            <SidebarGroupLabel>
                                <h4 className="text-xs text-muted-foreground">Recent Chats</h4>
                            </SidebarGroupLabel>
                            <div className="px-2 py-4 text-center">
                                <p className="text-sm text-muted-foreground">No Conversations Yet</p>
                            </div>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarGroupContent>
            </SidebarGroup>
        );
    }

    const handleDeleteAllThreads = () => {
        mutate();
    };

    const generatingTitleThreadIds = threadList.map((thread: any) => thread?._id);
    const handleDeleteUnarchivedThreads = () => {
    };
    const currentThreadId = '2';

    return (
        <>
            {groups.map((group, index) => {
                const isFirst = index === 0;
                return (
                    <SidebarGroup key={group.label}>
                        <SidebarGroupContent className="group-data-[collapsible=icon]:hidden group/threads">
                            <SidebarMenu>
                                <SidebarMenuItem>
                                    <SidebarGroupLabel>
                                        <h4 className="text-xs text-muted-foreground group-hover/threads:text-foreground transition-colors">
                                            {group.label}
                                        </h4>
                                        <div className="flex-1" />
                                        {isFirst && (
                                            <DropdownMenu>
                                                <DropdownMenuTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="data-[state=open]:bg-input! opacity-0 data-[state=open]:opacity-100! group-hover/threads:opacity-100 transition-opacity"
                                                    >
                                                        <MoreHorizontal />
                                                    </Button>
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent side="right" align="start">
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={handleDeleteAllThreads}
                                                    >
                                                        <Trash />
                                                        Delete All Chats
                                                    </DropdownMenuItem>
                                                    <DropdownMenuItem
                                                        variant="destructive"
                                                        onClick={handleDeleteUnarchivedThreads}
                                                    >
                                                        <Trash />
                                                        Delete Unarchived Chats
                                                    </DropdownMenuItem>
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        )}
                                    </SidebarGroupLabel>
                                    {group.threads.map((thread) => (
                                        <SidebarMenuSub key={thread?._id} className="group/thread mr-0">
                                            <ThreadDropdown
                                                side="right"
                                                threadId={thread?._id}
                                                beforeTitle={thread?.title}
                                            >
                                                <div className="flex items-center data-[state=open]:bg-input! group-hover/thread:bg-input! rounded-lg">
                                                    <Tooltip delayDuration={1000}>
                                                        <TooltipTrigger asChild>
                                                            <SidebarMenuButton
                                                                asChild
                                                                className="group-hover/thread:bg-transparent! px-4"
                                                                isActive={currentThreadId === thread._id}
                                                            >
                                                                <Link
                                                                    href={`/threads/${thread?._id}`}
                                                                    className="flex items-center"
                                                                >
                                                                    {generatingTitleThreadIds.includes(
                                                                        thread?._id,
                                                                    ) ? (
                                                                        <TextShimmer className="truncate min-w-0">
                                                                            {thread?.title || "New Chat"}
                                                                        </TextShimmer>
                                                                    ) : (
                                                                        <p className="truncate min-w-0">
                                                                            {thread?.title || "New Chat"}
                                                                        </p>
                                                                    )}
                                                                </Link>
                                                            </SidebarMenuButton>
                                                        </TooltipTrigger>
                                                        <TooltipContent className="max-w-[200px] p-4 break-all overflow-y-auto max-h-[200px]">
                                                            {thread?.title || "New Chat"}
                                                        </TooltipContent>
                                                    </Tooltip>
                                                    <SidebarMenuAction className="mr-4 data-[state=open]:bg-input data-[state=open]:opacity-100 opacity-0 group-hover/thread:opacity-100">
                                                        <MoreHorizontal />
                                                    </SidebarMenuAction>
                                                </div>
                                            </ThreadDropdown>
                                        </SidebarMenuSub>
                                    ))}
                                </SidebarMenuItem>
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                );
            })}

            {hasExcessThreads && (
                <SidebarMenu>
                    <SidebarMenuItem>
                        <div className="w-full flex px-4">
                            <Button
                                variant="secondary"
                                size="sm"
                                className="w-full hover:bg-input! justify-start"
                                onClick={() => setIsExpanded((v) => !v)}
                            >
                                <MoreHorizontal className="mr-2" />
                                {isExpanded ? "showLessChats" : "showAllChats"}
                                {isExpanded ? <ChevronUp /> : <ChevronDown />}
                            </Button>
                        </div>
                    </SidebarMenuItem>
                </SidebarMenu>
            )}
        </>
    );
}
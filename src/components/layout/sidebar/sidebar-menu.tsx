"use client";
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarGroupContent } from "@/components/ui/sidebar";

import { SidebarGroup } from "@/components/ui/sidebar";
import Link from "next/link";
// import { getShortcutKeyList, Shortcuts } from "lib/keyboard-shortcuts";
import { useRouter } from "next/navigation";
import { MCPIcon } from "@/components/icons/mcp-icon";
import { WriteIcon } from "@/components/icons/write-icon";
import {
  FolderOpenIcon,
  FolderSearchIcon,
  PlusIcon,
  Waypoints,
} from "lucide-react";
import { useCallback, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
// import { useArchives } from "@/hooks/queries/use-archives";
// import { ArchiveDialog } from "../archive-dialog";

export function AppSidebarMenus() {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const [expandedArchive, setExpandedArchive] = useState(false);
  const [addArchiveDialogOpen, setAddArchiveDialogOpen] = useState(false);

//   const { data: archives, isLoading: isLoadingArchives } = useArchives();
  const toggleArchive = useCallback(() => {
    setExpandedArchive((prev) => !prev);
  }, []);

  return (
    <SidebarGroup>
      <SidebarGroupContent>
        <SidebarMenu>
          <Tooltip>
            <SidebarMenuItem className="mb-1">
              <Link
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  setOpenMobile(false);
                  router.push(`/`);
                  router.refresh();
                }}
              >
                <SidebarMenuButton className="flex font-semibold group/new-chat bg-input/20 border border-border/40">
                  <WriteIcon className="size-4" />
                   New Chat
                  <div className="flex items-center gap-1 text-xs font-medium ml-auto opacity-0 group-hover/new-chat:opacity-100 transition-opacity">
                    {/* {getShortcutKeyList(Shortcuts.openNewChat).map((key) => (
                      <span
                        key={key}
                        className="border w-5 h-5 flex items-center justify-center bg-accent rounded"
                      >
                        {key}
                      </span>
                    ))} */}
                  </div>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </Tooltip>
        </SidebarMenu>
        <SidebarMenu>
          <Tooltip>
            <SidebarMenuItem>
              <Link href="/mcp">
                <SidebarMenuButton className="font-semibold">
                  <MCPIcon className="size-4 fill-accent-foreground" />
                  MCP Configuration
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </Tooltip>
        </SidebarMenu>
        <SidebarMenu>
          <Tooltip>
            <SidebarMenuItem>
              <Link href="/workflow">
                <SidebarMenuButton className="font-semibold">
                  <Waypoints className="size-4" />
                  Worklows
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </Tooltip>
        </SidebarMenu>
        <SidebarMenu className="group/archive">
          <Tooltip>
            <SidebarMenuItem>
              <SidebarMenuButton
                onClick={toggleArchive}
                className="font-semibold"
              >
                {expandedArchive ? (
                  <FolderOpenIcon className="size-4" />
                ) : (
                  <FolderSearchIcon className="size-4" />
                )}
                Archives
              </SidebarMenuButton>
              <SidebarMenuAction
                className="group-hover/archive:opacity-100 opacity-0 transition-opacity"
                onClick={() => setAddArchiveDialogOpen(true)}
              >
                <Tooltip>
                  <TooltipTrigger asChild>
                    <PlusIcon className="size-4" />
                  </TooltipTrigger>
                  <TooltipContent side="right" align="center">
                    Add Archive
                  </TooltipContent>
                </Tooltip>
              </SidebarMenuAction>
            </SidebarMenuItem>
          </Tooltip>
          {/* {expandedArchive && (
            <>
              <SidebarMenuSub>
                {isLoadingArchives ? (
                  <div className="gap-2 flex flex-col">
                    {Array.from({ length: 2 }).map((_, index) => (
                      <Skeleton key={index} className="h-6 w-full" />
                    ))}
                  </div>
                ) : archives!.length === 0 ? (
                  <SidebarMenuSubItem>
                    <SidebarMenuSubButton className="text-muted-foreground">
                      No Archives
                    </SidebarMenuSubButton>
                  </SidebarMenuSubItem>
                ) : (
                  archives!.map((archive) => (
                    <SidebarMenuSubItem
                      onClick={() => {
                        router.push(`/archive/${archive.id}`);
                      }}
                      key={archive.id}
                      className="cursor-pointer"
                    >
                      <SidebarMenuSubButton>
                        {archive.name}
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))
                )}
              </SidebarMenuSub>
            </>
          )} */}
        </SidebarMenu>
      </SidebarGroupContent>
      {/* <ArchiveDialog
        open={addArchiveDialogOpen}
        onOpenChange={setAddArchiveDialogOpen}
      /> */}
    </SidebarGroup>
  );
}
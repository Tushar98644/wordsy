'use client'

import {
  SidebarMenuAction,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { SidebarMenu, SidebarMenuItem } from "@/components/ui/sidebar";
import { SidebarGroupContent } from "@/components/ui/sidebar";

import { SidebarGroup } from "@/components/ui/sidebar";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { WriteIcon } from "@/components/ui/write-icon";
import {
  FolderOpenIcon,
  FolderSearchIcon,
  NotebookPen,
  PlusIcon,
} from "lucide-react";
import { useCallback, useState } from "react";

export function AppSidebarMenus() {
  const router = useRouter();
  const { setOpenMobile } = useSidebar();
  const [expandedArchive, setExpandedArchive] = useState(false);
  const [addArchiveDialogOpen, setAddArchiveDialogOpen] = useState(false);

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
'use client'

import { PropsWithChildren, useMemo, useState } from "react";
import { Archive, ChevronRight, Loader, PencilLine, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDeleteThread } from "@/hooks/queries/useThreadQuery";

type Props = PropsWithChildren<{
  threadId: string;
  beforeTitle?: string;
  onDeleted?: () => void;
  side?: "top" | "bottom" | "left" | "right";
  align?: "start" | "end" | "center";
}>;

type ArchiveItem = { id: string; name: string; itemCount?: number };
const useMockArchives = () => {
  const list: ArchiveItem[] = useMemo(
    () => [
      { id: "a1", name: "Work", itemCount: 12 },
      { id: "a2", name: "Personal", itemCount: 3 },
      { id: "a3", name: "Ideas" },
    ],
    [],
  );
  return list;
};

export function ThreadDropdown({
  threadId,
  children,
  beforeTitle,
  onDeleted,
  side,
  align,
}: Props) {
  const archiveList = useMockArchives();

  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState(beforeTitle ?? "");

  const { mutate, isPending } = useDeleteThread();

  const handleUpdate = (newTitle: string) => {
    setTitle(newTitle);
  };

  const handleDelete = () => {
    console.log(`[THREADS] Deleting thread from client ${threadId}`);
    mutate(threadId);
  };

  const handleAddToArchive = (archiveId: string) => {
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent className="p-0 w-[220px]" side={side} align={align}>
        <Command>
          <div className="flex items-center gap-2 px-2 py-1 text-xs pt-2 text-muted-foreground ml-1">
            Chat
          </div>

          <CommandList>
            <CommandGroup>
              <CommandItem className="cursor-pointer p-0">
                <UpdateThreadNameDialog
                  initialTitle={title}
                  onUpdated={(val) => handleUpdate(val)}
                >
                  <div className="flex items-center gap-2 w-full px-2 py-1 rounded">
                    <PencilLine className="text-foreground" />
                    <span className="mr-4">Rename Chat</span>
                  </div>
                </UpdateThreadNameDialog>
              </CommandItem>

              <CommandItem className="cursor-pointer p-0">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="flex items-center gap-2 w-full px-2 py-1 rounded hover:bg-accent">
                      <Archive className="text-foreground" />
                      <span className="mr-4">Add To Archive</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="right" align="start" className="w-56">
                    {archiveList.length === 0 ? (
                      <DropdownMenuItem disabled className="text-muted-foreground">
                        No Archives
                      </DropdownMenuItem>
                    ) : (
                      archiveList.map((archive) => (
                        <DropdownMenuItem
                          key={archive.id}
                          onClick={() => handleAddToArchive(archive.id)}
                          className="cursor-pointer"
                        >
                          <Archive className="mr-2 h-4 w-4" />
                          <span className="truncate">{archive.name}</span>
                          {archive.itemCount ? (
                            <span className="ml-auto text-xs text-muted-foreground">
                              {archive.itemCount}
                            </span>
                          ) : null}
                        </DropdownMenuItem>
                      ))
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </CommandItem>
            </CommandGroup>

            <CommandSeparator />

            <CommandGroup>
              <CommandItem disabled={isPending} className="cursor-pointer p-0">
                <div
                  className="flex items-center gap-2 w-full px-2 py-1 rounded"
                  onClick={handleDelete}
                >
                  <Trash className="text-destructive" />
                  <span className="text-destructive">Delete Chat</span>
                  {isPending && <Loader className="ml-auto h-4 w-4 animate-spin" />}
                </div>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}

const UpdateThreadNameDialog = ({
  initialTitle,
  children,
  onUpdated,
}: PropsWithChildren<{
  initialTitle: string;
  onUpdated: (title: string) => void;
}>) => {
  const [title, setTitle] = useState(initialTitle);

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Rename Chat</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <Input
            type="text"
            value={title}
            onKeyDown={(e) => {
              if (e.key === "Enter") onUpdated(title);
            }}
            onInput={(e) => setTitle(e.currentTarget.value)}
          />
        </DialogDescription>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline" onClick={() => onUpdated(title)}>
              update
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
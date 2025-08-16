
'use client'

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Lightbulb, CornerRightUp, Mic, Settings, LightbulbIcon } from "lucide-react";
import { FileUploadButton } from "./file-upload-button";
import { FileMetadata } from "@/types/file";

interface PromptInputProps {
  onSendMessage: (message: string, files?: FileMetadata[]) => void;
  disabled?: boolean;
}

export default function PromptInput({ onSendMessage, disabled }: PromptInputProps) {
  const [files, setFiles] = React.useState<FileMetadata[]>([]);
  const [inputValue, setInputValue] = React.useState("");
  const [clearUploadsSignal, setClearUploadsSignal] = React.useState(0);

  const handleSendMessage = () => {
    if (!inputValue.trim() && files.length === 0) return;

    onSendMessage(inputValue, files);

    setInputValue("");
    setFiles([]);
    setClearUploadsSignal((s) => s + 1);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !disabled) {
      handleSendMessage();
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
      <div className="relative w-full">
        <div className="flex flex-col w-full">
          <div id="file-upload-portal"></div>
          <div className="shadow-lg overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-sm bg-muted/60 relative flex w-full flex-col">
            <div className="flex flex-col gap-3 px-4 lg:px-5 pt-3 pb-3">
              <div className="relative w-full">
                <input
                  placeholder="Ask anything..."
                  disabled={disabled}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  className="min-h-[2.5rem] px-2 w-full outline-none border-none resize-none text-base bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                  onKeyDown={handleKeyDown}
                />
              </div>

              <div className="flex w-full items-center justify-between">
                <div className="flex items-center gap-1 sm:gap-2 relative">
                  <FileUploadButton
                    onFilesUploaded={(uploaded) => {
                      setFiles(uploaded);
                    }}
                    clearSignal={clearUploadsSignal}
                  />

                  
                                    <Tooltip>
                    <TooltipTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-full p-2 h-8 w-8">
                        <Lightbulb className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent side="top">Sequential Thinking</TooltipContent>
                  </Tooltip>

                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="rounded-full p-2 h-8 w-8">
                        <Settings className="size-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem>Tool Mode</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  <div className="hidden xs:block">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm" className="rounded-full p-2 h-8 w-8">
                          <LightbulbIcon className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem>Tools & Agents</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>

                <div className="flex items-center gap-1 sm:gap-2">
                  <Select>
                    <SelectTrigger className="w-auto min-w-[60px] sm:min-w-[80px] border-none bg-transparent rounded-full hover:bg-input text-sm h-8">
                      <SelectValue placeholder="GPT-4" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="gpt-4">GPT-4</SelectItem>
                      <SelectItem value="claude">Claude</SelectItem>
                    </SelectContent>
                  </Select>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button size="sm" className="rounded-full p-2 h-8 w-8">
                        <Mic className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Voice Chat</TooltipContent>
                  </Tooltip>

                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handleSendMessage}
                        disabled={disabled || (!inputValue.trim() && files.length === 0)}
                        className="cursor-pointer text-muted-foreground rounded-full p-2 bg-secondary hover:bg-accent-foreground hover:text-accent transition-all duration-200 h-8 w-8 flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <CornerRightUp className="size-4" />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>Send message</TooltipContent>
                  </Tooltip>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div> 
    </div>
  );
}

import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Plus, Lightbulb, CornerRightUp, Mic, Settings, LightbulbIcon, ChevronDown } from "lucide-react"

export default function PromptInput({ onSendMessage }: { onSendMessage: (message: string) => void }) {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="relative w-full">
                {/* Mobile: Additional toolbar above input */}
                <div className="sm:hidden mb-2">
                    <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl">
                        <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground">Model:</span>
                            <Select>
                                <SelectTrigger className="w-auto min-w-[70px] border-none bg-transparent rounded-md hover:bg-input text-xs h-7">
                                    <SelectValue placeholder="GPT-4" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="gpt-4">GPT-4</SelectItem>
                                    <SelectItem value="claude">Claude</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="h-7 px-2 text-xs">
                                    Tools <ChevronDown className="size-3 ml-1" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem>
                                    <Lightbulb className="size-4 mr-2" />
                                    Sequential Thinking
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <Settings className="size-4 mr-2" />
                                    Tool Mode
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <LightbulbIcon className="size-4 mr-2" />
                                    Tools & Agents
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </div>

                {/* Main input container */}
                <div className="flex flex-col w-full">
                    <div className="shadow-lg overflow-hidden rounded-2xl sm:rounded-3xl lg:rounded-4xl backdrop-blur-sm bg-muted/60 relative flex w-full flex-col">
                        <div className="flex flex-col gap-3 sm:gap-3.5 px-3 sm:px-4 lg:px-5 pt-2 pb-3 sm:pb-4">
                            <div className="relative w-full">
                                <input
                                    placeholder="Ask anything..."
                                    className="min-h-[3rem] sm:min-h-[2rem] px-2 w-full outline-none border-none resize-none text-base"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                            onSendMessage(e.currentTarget.value);
                                            e.currentTarget.value = "";
                                        }
                                    }}
                                />
                            </div>

                            {/* Bottom Toolbar - Mobile simplified */}
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <Button variant="ghost" size="sm" className="rounded-full p-2 h-9 w-9 sm:h-auto sm:w-auto">
                                        <Plus className="size-4" />
                                    </Button>
                                    
                                    {/* Desktop toolbar items */}
                                    <div className="hidden sm:flex items-center gap-1">
                                        <Tooltip>
                                            <TooltipTrigger asChild>
                                                <Button variant="ghost" size="sm" className="rounded-full p-2">
                                                    <Lightbulb className="size-4" />
                                                </Button>
                                            </TooltipTrigger>
                                            <TooltipContent side="top">Sequential Thinking</TooltipContent>
                                        </Tooltip>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="rounded-full p-2">
                                                    <Settings className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>Tool Mode</DropdownMenuContent>
                                        </DropdownMenu>

                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="sm" className="rounded-full p-2">
                                                    <LightbulbIcon className="size-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent>Tools & Agents</DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2">
                                    {/* Desktop model selector */}
                                    <div className="hidden sm:block">
                                        <Select>
                                            <SelectTrigger className="w-auto border-none bg-transparent rounded-full hover:bg-input">
                                                <SelectValue placeholder="model" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="gpt-4">GPT-4</SelectItem>
                                                <SelectItem value="claude">Claude</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <Tooltip>
                                        <TooltipTrigger asChild>
                                            <Button size="sm" className="rounded-full p-2 h-9 w-9 sm:h-auto sm:w-auto">
                                                <Mic className="size-4" />
                                            </Button>
                                        </TooltipTrigger>
                                        <TooltipContent>Voice Chat</TooltipContent>
                                    </Tooltip>

                                    <div className="cursor-pointer text-muted-foreground rounded-full p-2 bg-secondary hover:bg-accent-foreground hover:text-accent transition-all duration-200 h-9 w-9 sm:h-auto sm:w-auto flex items-center justify-center">
                                        <CornerRightUp className="size-4" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
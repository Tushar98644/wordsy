import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Plus, Lightbulb, CornerRightUp, Mic, Settings, LightbulbIcon } from "lucide-react"

export default function PromptInput({ onSendMessage, disabled }: {
    onSendMessage: (message: string) => void;
    disabled?: boolean;
}) {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 bg-transparent">
            <div className="relative w-full">
                <div className="flex flex-col w-full">
                    <div className="shadow-lg overflow-hidden rounded-2xl sm:rounded-3xl backdrop-blur-sm bg-muted/60 relative flex w-full flex-col">
                        <div className="flex flex-col gap-3 px-4 lg:px-5 pt-3 pb-3">
                            {/* Input field */}
                            <div className="relative w-full">
                                <input
                                    placeholder="Ask anything..."
                                    disabled={disabled}
                                    className="min-h-[2.5rem] px-2 w-full outline-none border-none resize-none text-base bg-transparent disabled:opacity-50 disabled:cursor-not-allowed"
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && !disabled && e.currentTarget.value.trim()) {
                                            onSendMessage(e.currentTarget.value.trim());
                                            e.currentTarget.value = "";
                                        }
                                    }}
                                />
                            </div>
                            <div className="flex w-full items-center justify-between">
                                <div className="flex items-center gap-1 sm:gap-2">
                                    <Button variant="ghost" size="sm" className="rounded-full p-2 h-8 w-8">
                                        <Plus className="size-4" />
                                    </Button>

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

                                    {/* Hide this on very small screens */}
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
                                    {/* Model selector */}
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

                                    <div className="cursor-pointer text-muted-foreground rounded-full p-2 bg-secondary hover:bg-accent-foreground hover:text-accent transition-all duration-200 h-8 w-8 flex items-center justify-center">
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

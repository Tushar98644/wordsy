import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Plus, Lightbulb, ChevronDown, CornerRightUp, Mic, Settings, LightbulbIcon } from "lucide-react"

export default function PromptInput () {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="z-10 mx-auto w-full max-w-3xl relative">
                <div className="flex w-full flex-col px-4">
                    <div className="shadow-lg overflow-hidden rounded-4xl backdrop-blur-sm bg-muted/60 relative flex w-full flex-col z-10">
                        {/* Input Section */}
                        <div className="flex flex-col gap-3.5 px-5 pt-2 pb-4">
                            <div className="relative min-w-full">
                                <input
                                    placeholder="Ask anything..."
                                    className="min-h-[2rem] px-2 w-full outline-none border-none resize-none"
                                />
                            </div>

                            {/* Bottom Toolbar */}
                            <div className="flex w-full items-center">
                                <Button variant="ghost" size="sm" className="rounded-full p-2">
                                    <Plus className="size-4" />
                                </Button>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button variant="ghost" size="sm" className="rounded-full p-2">
                                            <Lightbulb className="size-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent side="top">
                                        Sequential Thinking
                                    </TooltipContent>
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
                                        <Button variant="ghost" size="sm" className="rounded-full p-2 mx-1">
                                            <LightbulbIcon className="size-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>Tools & Agents</DropdownMenuContent>
                                </DropdownMenu>

                                <div className="flex-1" />
 
                                 <div className="flex flex-row gap-2">

                                <Select>
                                    <SelectTrigger className="w-auto border-none bg-transparent rounded-full hover:bg-input">
                                        <SelectValue placeholder="model" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                                        <SelectItem value="claude">Claude</SelectItem>
                                    </SelectContent>
                                </Select>

                                <Tooltip>
                                    <TooltipTrigger asChild>
                                        <Button size="sm" className="rounded-full p-2">
                                            <Mic className="size-4" />
                                        </Button>
                                    </TooltipTrigger>
                                    <TooltipContent>Voice Chat</TooltipContent>
                                </Tooltip>

                                <div className="cursor-pointer text-muted-foreground rounded-full p-2 bg-secondary hover:bg-accent-foreground hover:text-accent transition-all duration-200">
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
};
'use client'

import { Sparkles, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";
import { TextGenerateEffect } from "@/components/ui/text-generate-effect";
import { useCreateThread } from "@/hooks/queries/useThreadQuery";

const MainContent = () => {
    const words = [
        {
            text: "Welcome",
        },
        {
            text: "to",
        },
        {
            text: "Wordsy",
            className: "text-primary dark:text-primary",
        },
        {
            text: "-",
        },
        {
            text: "your",
        },
        {
            text: "AI",
        },
        {
            text: "companion",
            className: "text-primary/80 dark:text-primary/80",
        },
    ];

    const desc = `Your intelligent assistant ready to help with writing, learning, creativity, and more.
                What would you like to explore today?`

    
    const { mutate: createThread } = useCreateThread();    

    const handleNewChat = () => {
        createThread("New Chat",{
            onSuccess: (data) => {
                window.location.href = `/threads/${data._id}`;
            }
        });
    }

    return (
        <div className="flex flex-col h-full items-center justify-center">
            {/* Main Content Area */}
            <div className="flex-1 flex flex-col items-center justify-center p-6">
                <div className="max-w-4xl w-full space-y-12">

                    {/* Hero Section with Typewriter */}
                    <div className="text-center space-y-8">
                        <div className="flex items-center justify-center gap-3 mb-8">
                            <div className="relative">
                                <Sparkles className="size-10 text-primary animate-pulse" />
                                <div className="absolute -top-1 -right-1 size-4 bg-primary/20 rounded-full animate-ping" />
                            </div>
                        </div>

                        <div className="space-y-4">
                            <TypewriterEffectSmooth words={words} />
                            <div className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
                                <TextGenerateEffect words={desc} />
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
                        <Button
                            size="lg"
                            className="group relative overflow-hidden rounded-full px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                            onClick={() => {
                                handleNewChat();
                                console.log("Start new conversation");
                            }}
                        >
                            <span className="relative z-10 flex items-center gap-2">
                                Start New Chat
                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary/80 opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Button>

                        <Button
                            variant="outline"
                            size="lg"
                            className="rounded-full px-8 py-6 text-base font-medium border-2 hover:bg-muted/50 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                            onClick={() => {
                                // Handle browse examples
                                console.log("Browse examples");
                            }}
                        >
                            Browse Examples
                        </Button>
                    </div>

                    {/* Footer Note */}
                    <div className="text-center">
                        <p className="text-xs text-muted-foreground/60">
                            Powered by advanced AI • Always learning, always improving
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default MainContent;

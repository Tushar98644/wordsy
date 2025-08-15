'use client'

import PromptInput from "@/components/input/prompt-input";
import { useFetchThread } from "@/hooks/queries/useThreadQuery";
import { Message } from "@/types/message";
import { useParams } from "next/navigation";

const ChatPage = () => {
    const { id } = useParams<{ id: string }>();
    const { data: thread } = useFetchThread(id);

    return (
        // <div className={`w-full h-full flex px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12
        // ${messages.length === 0 ? 'items-center justify-center' : 'items-end'}
        // `}>
        //     <div className="w-full max-w-4xl mx-auto">
        //         <PromptInput />
        //     </div>
        // </div>
        <div>
            {thread?.messages.map((message: Message) => (
                <div key={message?._id}>
                    <p>{message.content}</p>
                </div>
            ))}
            <PromptInput />
        </div>
    );
}

export default ChatPage;
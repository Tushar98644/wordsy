import PromptInput from "@/components/input/prompt-input";

const ChatPage = () => {
    const messages = [

    ];
    return (
        <div className={`min-w-full h-full flex p-12
        ${messages.length === 0 ? 'items-center justify-center' : 'items-end'}
        `}>
            <PromptInput />
        </div>
    );
}

export default ChatPage;
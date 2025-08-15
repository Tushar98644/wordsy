import PromptInput from "@/components/input/prompt-input";

const ChatPage = () => {
    const messages = [

    ];
    
    return (
        <div className={`w-full h-full flex px-4 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:px-12 lg:py-12
        ${messages.length === 0 ? 'items-center justify-center' : 'items-end'}
        `}>
            <div className="w-full max-w-4xl mx-auto">
                <PromptInput />
            </div>
        </div>
    );
}

export default ChatPage;
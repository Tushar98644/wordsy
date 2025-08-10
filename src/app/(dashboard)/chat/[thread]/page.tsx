import PromptInput from "@/components/input/prompt-input";

const ChatPage = () => {
    const messages = [];
    return ( 
        <div className="min-w-full">
            <PromptInput />
        </div>
     );
}
 
export default ChatPage;
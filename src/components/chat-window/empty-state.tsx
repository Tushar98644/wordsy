import ChatInput from "@/components/input/chat-input";

export const EmptyState: React.FC = () => {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-4">
      <h1 className="text-2xl md:text-4xl font-normal text-center mb-8 md:mb-12 text-white leading-tight">
        Where should we begin?
      </h1>
      <div className="w-full max-w-4xl">
        <ChatInput />
      </div>
    </div>
  );
};
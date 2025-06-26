import { Plus, Shuffle, Mic, AudioLines } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface ChatInputProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.MouseEvent<HTMLButtonElement> | React.KeyboardEvent<HTMLDivElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    isUploading: boolean;
    isLoading: boolean;
}

const ChatInput = (
    {
        input,
        handleInputChange,
        handleKeyPress,
        handleSubmit,
        fileInputRef,
        handleFileChange,
        file,
        isUploading,
        isLoading
    }: ChatInputProps
) => {
    return (
            <div className="relative">
                <div className="relative bg-[#2f2f2f] rounded-[32px] border border-[#404040] mb-4">
                    <Input
                        value={input}
                        onChange={handleInputChange}
                        onKeyDown={handleKeyPress}
                        placeholder="Ask anything"
                        className="w-full bg-transparent border-0 text-white placeholder-gray-500 text-[18px] px-8 py-6 focus:ring-0 focus:outline-none rounded-[32px] min-h-[80px] resize-none"
                    />

                    {/* Bottom input controls */}
                    <div className="absolute left-6 bottom-4 flex items-center gap-4">
                        <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg"
                            onClick={() => fileInputRef.current?.click()}
                        >
                            <Plus className="w-5 h-5" />
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            />
                        </Button>

                        <Button
                            variant="ghost"
                            className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg flex items-center gap-2"
                        >
                            <Shuffle className="w-4 h-4" />
                            <span className="text-sm">Tools</span>
                        </Button>
                    </div>

                    <div className="absolute right-6 bottom-4 flex items-center gap-2">
                        <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg">
                            <Mic className="w-5 h-5" />
                        </Button>

                        <Button variant="ghost" className="text-gray-400 hover:text-white hover:bg-[#404040] p-1 rounded-lg">
                            <AudioLines className="w-5 h-5" />
                        </Button>
                    </div>
                </div>

                {/* Send button (appears when typing) */}
                {(input.trim() || file) && (
                    <Button
                        onClick={(e) => handleSubmit(e as any)}
                        disabled={isUploading || isLoading}
                        className={`absolute right-6 bottom-8 ${isUploading || isLoading ? 'bg-gray-500' : 'bg-white hover:bg-gray-100'
                            } text-black rounded-full w-8 h-8 p-0 flex items-center justify-center`}
                    >
                        <span className="text-lg">→</span>
                    </Button>
                )}
            </div>
    );
}

export default ChatInput;
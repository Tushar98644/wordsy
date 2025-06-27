import { X, Plus, Shuffle, Mic, AudioLines } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TopControls from "./top-controls";

interface ChatInputProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    fileUrl?: string | null;
    isUploading: boolean;
    isEditing: { id: string; content: string } | null;
    setIsEditing: React.Dispatch<React.SetStateAction<{ id: string; content: string } | null>>;
    handleSaveEdit: (e: React.FormEvent) => void;
    removeFile: () => void;
}

const ChatInput = ({
    input,
    handleInputChange,
    handleKeyPress,
    handleSubmit,
    fileInputRef,
    handleFileChange,
    file,
    fileUrl,
    isUploading,
    isEditing,
    setIsEditing,
    handleSaveEdit,
    removeFile
}: ChatInputProps) => {
    return (
        <div className="w-full max-w-4xl mx-auto px-4 pb-8 ">
            <TopControls />

            {isEditing && (
                <div className="mb-4 p-3 bg-[#2f2f2f] rounded-lg flex justify-between items-center">
                    <span className="text-gray-400">Editing message</span>
                    <div className="flex space-x-2">
                        <Button variant="outline" className="text-gray-300 hover:bg-[#404040]" onClick={() => setIsEditing(null)}>Cancel</Button>
                        <Button className="bg-[#4f46e5] hover:bg-[#4338ca]" onClick={handleSaveEdit}>Save Changes</Button>
                    </div>
                </div>
            )}

            {(file || fileUrl) && (
                <div className="mb-3 flex items-center justify-between p-2 bg-[#2f2f2f] rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-500 w-8 h-8 rounded flex items-center justify-center">
                            <span className="text-xs">{file?.type.startsWith('image') ? 'IMG' : 'DOC'}</span>
                        </div>
                        <span className="text-sm text-gray-400 truncate max-w-xs">
                            {file?.name || 'Uploaded file'}
                        </span>
                        {isUploading && (
                            <div className="ml-2 flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce" />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75" />
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150" />
                            </div>
                        )}
                    </div>
                    <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white" onClick={removeFile} disabled={isUploading}>
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}
            <div className="bg-[#2f2f2f] rounded-[30px] p-4">
                <form onSubmit={handleSubmit}>
                    <div className="relative">
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask anything"
                            disabled={isUploading}
                            className="bg-transparent border-none text-white placeholder-gray-500 text-[18px] px-6 py-6 focus:ring-0 focus:outline-none rounded-[32px] resize-none"
                        />

                        {(input.trim() || file) && (
                            <Button
                                type="submit"
                                disabled={isUploading}
                                className={`absolute right-5 bottom-5 ${isUploading ? 'bg-gray-500' : 'bg-white hover:bg-gray-100'} text-black rounded-full w-8 h-8 p-0 flex items-center justify-center`}
                            >
                                {isUploading ? (
                                    <div className="flex space-x-1">
                                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce" />
                                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-75" />
                                        <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-150" />
                                    </div>
                                ) : (
                                    <span className="text-lg">→</span>
                                )}
                            </Button>
                        )}
                    </div>
                </form>

                {/* Controls under input */}
                <div className="mt-4 flex justify-between items-center">
                    <div className="flex gap-4">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="text-gray-400"
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isUploading}
                        >
                            <Plus className="w-5 h-5" />
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                disabled={isUploading}
                            />
                        </Button>

                        <Button variant="ghost" className="text-gray-400 flex items-center gap-2" disabled={isUploading}>
                            <Shuffle className="w-4 h-4" />
                            <span className="text-sm">Tools</span>
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-400" disabled={isUploading}>
                            <Mic className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400" disabled={isUploading}>
                            <AudioLines className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default ChatInput;

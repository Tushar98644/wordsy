import { X, Plus, Shuffle, Mic, AudioLines } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface EditInputProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    fileUrl?: string | null;
    isUploading: boolean;
    isLoading: boolean;
    isEditing: { id: string; content: string } | null;
    setIsEditing: React.Dispatch<React.SetStateAction<{ id: string; content: string } | null>>;
    handleSaveEdit: (e: React.FormEvent) => void;
    removeFile: () => void;
}

const EditInput = (
    {
        input,
        handleInputChange,
        handleKeyPress,
        handleSubmit,
        fileInputRef,
        handleFileChange,
        file,
        fileUrl,
        isUploading,
        isLoading,
        isEditing,
        setIsEditing,
        handleSaveEdit,
        removeFile
    }: EditInputProps
) => {
    return (
        <div className="p-4 border-t border-[#2f2f2f]">
            {isEditing && (
                <div className="mb-4 p-3 bg-[#2f2f2f] rounded-lg flex justify-between items-center">
                    <span className="text-gray-400">Editing message</span>
                    <div className="flex space-x-2">
                        <Button
                            variant="outline"
                            className="text-gray-300 hover:bg-[#404040]"
                            onClick={() => setIsEditing(null)}
                        >
                            Cancel
                        </Button>
                        <Button
                            className="bg-[#4f46e5] hover:bg-[#4338ca]"
                            onClick={handleSaveEdit}
                        >
                            Save Changes
                        </Button>
                    </div>
                </div>
            )}

            {(file || fileUrl) && (
                <div className="mb-2 flex items-center justify-between p-2 bg-[#2f2f2f] rounded-lg">
                    <div className="flex items-center gap-2">
                        <div className="bg-gray-500 w-8 h-8 rounded flex items-center justify-center">
                            <span className="text-xs">
                                {file?.type.startsWith('image') ? 'IMG' : 'DOC'}
                            </span>
                        </div>
                        <span className="text-sm text-gray-400 truncate max-w-xs">
                            {file?.name || 'Uploaded file'}
                        </span>
                        {isUploading && (
                            <div className="ml-2 flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-gray-400 rounded-full animate-bounce delay-150"></div>
                            </div>
                        )}
                    </div>
                    <Button
                        variant="ghost"
                        size="icon"
                        className="text-gray-400 hover:text-white"
                        onClick={removeFile}
                        disabled={isUploading}
                    >
                        <X className="w-4 h-4" />
                    </Button>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="relative">
                    <div className="relative bg-[#2f2f2f] rounded-[32px] border border-[#404040]">
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            placeholder="Ask anything"
                            className="w-full bg-transparent border-0 text-white placeholder-gray-500 text-[18px] px-8 py-6 focus:ring-0 focus:outline-none rounded-[32px] min-h-[80px] resize-none"
                            disabled={isUploading}
                        />

                        <div className="absolute left-6 bottom-4 flex items-center gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-[#404040]"
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

                            <Button
                                variant="ghost"
                                className="text-gray-400 hover:text-white hover:bg-[#404040] flex items-center gap-2"
                                disabled={isUploading}
                            >
                                <Shuffle className="w-4 h-4" />
                                <span className="text-sm">Tools</span>
                            </Button>
                        </div>

                        <div className="absolute right-6 bottom-4 flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-[#404040]"
                                disabled={isUploading}
                            >
                                <Mic className="w-5 h-5" />
                            </Button>

                            <Button
                                variant="ghost"
                                size="icon"
                                className="text-gray-400 hover:text-white hover:bg-[#404040]"
                                disabled={isUploading}
                            >
                                <AudioLines className="w-5 h-5" />
                            </Button>
                        </div>
                    </div>

                    <Button
                        type="submit"
                        disabled={isUploading || isLoading || (!input.trim() && !file)}
                        className={`absolute right-6 bottom-8 ${isUploading || isLoading ? 'bg-gray-500' : 'bg-white hover:bg-gray-100'
                            } text-black rounded-full w-8 h-8 p-0 flex items-center justify-center`}
                    >
                        {isUploading || isLoading ? (
                            <div className="flex space-x-1">
                                <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce"></div>
                                <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-75"></div>
                                <div className="w-1.5 h-1.5 bg-black rounded-full animate-bounce delay-150"></div>
                            </div>
                        ) : (
                            <span className="text-lg">→</span>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}

export default EditInput;
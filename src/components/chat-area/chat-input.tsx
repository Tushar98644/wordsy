import { X, Plus, Shuffle, Mic, AudioLines, FileText, Image as ImageIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import TopControls from "./top-controls";

interface FileMetadata {
    fileId: string;
    fileName: string;
    mimeType: string;
    size: number;   
}

interface ChatInputProps {
    input: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleKeyPress: (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
    handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    fileInputRef: React.RefObject<HTMLInputElement | null>;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    file: File | null;
    fileUrl?: string | null;
    fileMetadata: FileMetadata | null;
    isUploading: boolean;
    isLoading: boolean;
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
    fileMetadata,
    isUploading,
    isLoading,
    isEditing,
    setIsEditing,
    handleSaveEdit,
    removeFile
}: ChatInputProps) => {
    const isDisabled = isUploading || isLoading;

    const formatFileSize = (bytes: number): string => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const getFilePreviewUrl = () => {
        if (fileUrl) return fileUrl;
        if (file) return URL.createObjectURL(file);
        return null;
    };

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (input.trim() || file || fileMetadata) {
            handleSubmit(e);
            setTimeout(() => {
                removeFile();
            }, 100);
        }
    };

    const displayFilename = fileMetadata?.fileName || file?.name || 'Uploaded file';
    const displayMimeType = fileMetadata?.mimeType || file?.type || '';
    const displaySize = fileMetadata?.size || file?.size;
    const previewUrl = getFilePreviewUrl();

    const isImage = displayMimeType.startsWith('image/');
    const isPDF = displayMimeType.includes('pdf');
    const isDocument = displayMimeType.includes('document') || displayMimeType.includes('text');

    return (
        <div className="w-full max-w-4xl mx-auto px-4 pb-8">
            <TopControls />

            {isEditing && (
                <div className="mb-4 p-3 bg-[#2f2f2f] rounded-lg flex justify-between items-center">
                    <span className="text-gray-400">Editing message</span>
                    <div className="flex space-x-2">
                        <Button variant="outline" className="text-gray-300 hover:bg-[#404040]" onClick={() => setIsEditing(null)} disabled={isDisabled}>Cancel</Button>
                        <Button className="bg-[#4f46e5] hover:bg-[#4338ca]" onClick={handleSaveEdit} disabled={isDisabled}>Save Changes</Button>
                    </div>
                </div>
            )}

            {(file || fileUrl || fileMetadata) && (
                <div className="mb-4 p-4 bg-[#2f2f2f] rounded-xl border border-gray-600">
                    <div className="flex gap-4">
                        {/* File Preview */}
                        <div className="flex-shrink-0">
                            {isImage && previewUrl ? (
                                <div className="relative">
                                    <img 
                                        src={previewUrl} 
                                        alt={displayFilename}
                                        className="w-20 h-20 object-cover rounded-lg border border-gray-500"
                                    />
                                    {isUploading && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-75" />
                                                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <div className="w-20 h-20 bg-gray-600 rounded-lg flex items-center justify-center relative">
                                    {isPDF ? (
                                        <FileText className="w-8 h-8 text-red-400" />
                                    ) : isDocument ? (
                                        <FileText className="w-8 h-8 text-blue-400" />
                                    ) : (
                                        <FileText className="w-8 h-8 text-gray-400" />
                                    )}
                                    {isUploading && (
                                        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
                                            <div className="flex space-x-1">
                                                <div className="w-2 h-2 bg-white rounded-full animate-bounce" />
                                                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-75" />
                                                <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-150" />
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* File Info */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-white font-medium truncate text-sm">
                                        {displayFilename}
                                    </h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        {displaySize && (
                                            <span className="text-xs text-gray-400">
                                                {formatFileSize(displaySize)}
                                            </span>
                                        )}
                                        <span className="text-xs text-gray-500">
                                            {isPDF ? 'PDF Document' : 
                                             isImage ? 'Image' : 
                                             isDocument ? 'Document' : 'File'}
                                        </span>
                                    </div>
                                    {isUploading && (
                                        <div className="mt-2">
                                            <div className="w-full bg-gray-600 rounded-full h-1">
                                                <div className="bg-blue-500 h-1 rounded-full animate-pulse" style={{width: '60%'}}></div>
                                            </div>
                                            <span className="text-xs text-gray-400 mt-1">Uploading...</span>
                                        </div>
                                    )}
                                </div>
                                <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="text-gray-400 hover:text-white hover:bg-gray-600 ml-2" 
                                    onClick={removeFile} 
                                    disabled={isDisabled}
                                >
                                    <X className="w-4 h-4" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            <div className="bg-[#2f2f2f] rounded-[30px] p-4">
                <form onSubmit={handleFormSubmit}>
                    <div className="relative">
                        <Input
                            value={input}
                            onChange={handleInputChange}
                            onKeyDown={handleKeyPress}
                            placeholder={isLoading ? "Please wait for response..." : "Ask anything"}
                            disabled={isDisabled}
                            className="bg-transparent border-none text-white placeholder-gray-500 text-[18px] px-6 py-6 focus:ring-0 focus:outline-none rounded-[32px] resize-none"
                        />

                        {(input.trim() || file || fileMetadata) && (
                            <Button
                                type="submit"
                                disabled={isDisabled}
                                className={`absolute right-5 bottom-5 ${isDisabled ? 'bg-gray-500' : 'bg-white hover:bg-gray-100'} text-black rounded-full w-8 h-8 p-0 flex items-center justify-center`}
                            >
                                {isDisabled ? (
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
                            className="text-gray-400 hover:text-gray-200"
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            disabled={isDisabled}
                        >
                            <Plus className="w-5 h-5" />
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={handleFileChange}
                                accept="image/*,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                                disabled={isDisabled}
                            />
                        </Button>

                        <Button variant="ghost" className="text-gray-400 hover:text-gray-200 flex items-center gap-2" disabled={isDisabled}>
                            <Shuffle className="w-4 h-4" />
                            <span className="text-sm">Tools</span>
                        </Button>
                    </div>

                    <div className="flex gap-2">
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200" disabled={isDisabled}>
                            <Mic className="w-5 h-5" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-200" disabled={isDisabled}>
                            <AudioLines className="w-5 h-5" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ChatInput;
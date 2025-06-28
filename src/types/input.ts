export interface FileMetadata {
    fileName: string;
    mimeType: string;
    size: number;
}

export interface ChatInputProps {
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
    setInput: React.Dispatch<React.SetStateAction<string>>;
}
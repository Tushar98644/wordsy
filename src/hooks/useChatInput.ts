import { useCallback } from 'react';

interface UseChatInputProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  removeFile: () => void;
  file: File | null | undefined;
  fileMetadata: any;
}

export const useChatInput = ({
  input,
  setInput,
  handleSubmit,
  removeFile,
  file,
  fileMetadata
}: UseChatInputProps) => {
  const hasContent = useCallback(() => {
    return input.trim() || file || fileMetadata;
  }, [input, file, fileMetadata]);

  const getPlaceholderText = useCallback((isLoading: boolean, isUploading: boolean) => {
    if (isLoading) return "Please wait while the response is being generated...";
    if (isUploading) return "Uploading file...";
    return "Ask anything";
  }, []);

  const getFilePreviewUrl = useCallback((fileUrl?: string | null, file?: File | null) => {
    if (fileUrl) return fileUrl;
    if (file) return URL.createObjectURL(file);
    return null;
  }, []);

  const submitForm = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    if (hasContent()) {
      setInput('');
      handleSubmit(e);
      setTimeout(() => {
        removeFile();
      }, 100);
    }
  }, [hasContent, setInput, handleSubmit, removeFile]);

  return {
    hasContent,
    getPlaceholderText,
    getFilePreviewUrl,
    submitForm
  };
};
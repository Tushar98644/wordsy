import { useCallback } from 'react';

interface UseKeyboardHandlersProps {
  input: string;
  file?: File | null;
  fileMetadata?: any;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  removeFile: () => void;
}

export const useKeyboardHandlers = ({
  input,
  file,
  fileMetadata,
  handleSubmit,
  removeFile,
}: UseKeyboardHandlersProps) => {
  const handleKeyPress = useCallback((e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();

      if (input.trim() || file || fileMetadata) {
        const form = e.currentTarget.closest("form");
        if (form) {
          handleSubmit({ preventDefault: () => {}, currentTarget: form } as React.FormEvent<HTMLFormElement>);
          setTimeout(() => {
            removeFile();
          }, 100);
        }
      }
    }
  }, [input, file, fileMetadata, handleSubmit, removeFile]);

  return { handleKeyPress };
};

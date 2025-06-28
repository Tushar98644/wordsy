import { Input } from "@/components/ui/input";
import TopControls from "@/components/chat-window/top-controls";
import EditingBanner from "@/components/input/editing-banner";
import FileCard from "@/components/input/file-card";
import ChatControls from "@/components/input/chat-control";
import SubmitButton from "@/components/input/submit-button";
import { useChatInput } from '@/hooks/useChatInput';
import { useChatContext } from '@/context/chat-context';
import { useUIContext } from '@/context/ui-context';

const ChatInput: React.FC = () => {
  const { input, setInput, handleSubmit, removeFile, file, fileMetadata, isUploading, isLoading, isEditing, setIsEditing, handleSaveEdit, fileUrl, handleInputChange, fileInputRef, handleFileChange } = useChatContext();
  const { handleKeyPress } = useUIContext();
  const { hasContent, getPlaceholderText, getFilePreviewUrl, submitForm } = 
  useChatInput({ 
    input,
    setInput,
    handleSubmit,
    removeFile,
    file,
    fileMetadata
  });

  const isDisabled = isUploading || isLoading;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (hasContent()) {
        setInput('');

        const syntheticEvent = {
          preventDefault: () => { },
          currentTarget: e.currentTarget.form
        } as React.FormEvent<HTMLFormElement>;

        handleSubmit(syntheticEvent);
        setTimeout(() => {
          removeFile();
        }, 100);
      }
    } else {
      handleKeyPress(e);
    }
  };

  const displayFilename = fileMetadata?.fileName || file?.name || 'Uploaded file';
  const displayMimeType = fileMetadata?.mimeType || file?.type || '';
  const displaySize = fileMetadata?.size || file?.size;
  const previewUrl = getFilePreviewUrl(fileUrl, file);

  return (
    <div className="w-full max-w-4xl mx-auto px-4 pb-8">
      <TopControls />

      {isEditing && (
        <EditingBanner
          onCancel={() => setIsEditing(null)}
          onSave={handleSaveEdit}
          disabled={isDisabled}
        />
      )}

      {(file || fileUrl || fileMetadata) && (
        <FileCard
          fileName={displayFilename}
          mimeType={displayMimeType}
          size={displaySize}
          previewUrl={previewUrl}
          isUploading={isUploading}
          onRemove={removeFile}
          disabled={isDisabled}
        />
      )}

      <div className="bg-[#2f2f2f] rounded-[30px] p-4">
        <form onSubmit={submitForm}>
          <div className="relative">
            <Input
              value={input}
              onChange={handleInputChange}
              onKeyDown={handleKeyDown}
              placeholder={getPlaceholderText(isLoading, isUploading)}
              disabled={isDisabled}
              className="bg-transparent border-none text-white placeholder-gray-500 text-[18px] px-6 py-6 focus:ring-0 focus:outline-none rounded-[32px] resize-none"
            />

            <SubmitButton
              isVisible={hasContent()}
              isLoading={isLoading}
              disabled={isDisabled}
            />
          </div>
        </form>

        <ChatControls
          fileInputRef={fileInputRef}
          handleFileChange={handleFileChange}
          disabled={isDisabled}
        />
      </div>
    </div>
  );
};

export default ChatInput;
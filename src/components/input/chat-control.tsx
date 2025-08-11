import React from 'react';
import { Plus, Shuffle, Mic, AudioLines } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ChatControlsProps {
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
}

const ChatControls: React.FC<ChatControlsProps> = ({
  fileInputRef,
  handleFileChange,
  disabled
}) => {
  return (
    <div className="mt-4 flex justify-between items-center">
      <div className="flex gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="text-gray-400 hover:text-gray-200"
          type="button"
          onClick={() => fileInputRef.current?.click()}
          disabled={disabled}
        >
          <Plus className="w-5 h-5" />
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept="image/*,application/pdf,text/plain,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            disabled={disabled}
          />
        </Button>

        <Button 
          variant="ghost" 
          className="text-gray-400 hover:text-gray-200 flex items-center gap-2" 
          disabled={disabled}
        >
          <Shuffle className="w-4 h-4" />
          <span className="text-sm">Tools</span>
        </Button>
      </div>

      <div className="flex gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-gray-200" 
          disabled={disabled}
        >
          <Mic className="w-5 h-5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          className="text-gray-400 hover:text-gray-200" 
          disabled={disabled}
        >
          <AudioLines className="w-5 h-5" />
        </Button>
      </div>
    </div>
  );
};

export default ChatControls;

import { X } from "lucide-react";
import { Button } from "../ui/button";
import { formatFileSize, getFileDisplayType } from "../../utils/file";
import FilePreview from './file-preview';

interface FileCardProps {
  fileName: string;
  mimeType: string;
  size?: number;
  previewUrl?: string | null;
  isUploading: boolean;
  onRemove: () => void;
  disabled: boolean;
}

const FileCard: React.FC<FileCardProps> = ({
  fileName,
  mimeType,
  size,
  previewUrl,
  isUploading,
  onRemove,
  disabled
}) => {
  return (
    <div className="mb-4 p-4 bg-[#2f2f2f] rounded-xl border border-gray-600">
      <div className="flex gap-4">
        <FilePreview
          fileName={fileName}
          mimeType={mimeType}
          previewUrl={previewUrl}
          isUploading={isUploading}
        />

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between">
            <div className="flex-1 min-w-0">
              <h4 className="text-white font-medium truncate text-sm">
                {fileName}
              </h4>
              <div className="flex items-center gap-2 mt-1">
                {size && (
                  <span className="text-xs text-gray-400">
                    {formatFileSize(size)}
                  </span>
                )}
                <span className="text-xs text-gray-500">
                  {getFileDisplayType(mimeType)}
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
              onClick={onRemove} 
              disabled={disabled}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileCard;
import { FileText } from "lucide-react";
import { getFileType } from "@/utils/file";
import LoadingIndicator from './loading-indicator';
import Image from "next/image";

interface FilePreviewProps {
  fileName: string;
  mimeType: string;
  previewUrl?: string | null;
  isUploading: boolean;
}

const FilePreview: React.FC<FilePreviewProps> = ({
  fileName,
  mimeType,
  previewUrl,
  isUploading
}) => {
  const { isImage, isPDF, isDocument } = getFileType(mimeType);

  const getFileIcon = () => {
    if (isPDF) return <FileText className="w-8 h-8 text-red-400" />;
    if (isDocument) return <FileText className="w-8 h-8 text-blue-400" />;
    return <FileText className="w-8 h-8 text-gray-400" />;
  };

  if (isImage && previewUrl) {
    return (
      <div className="relative">
        <Image
          src={previewUrl} 
          alt={fileName}
          className="w-20 h-20 object-cover rounded-lg border border-gray-500"
          width={100}
          height={100}
        />
        {isUploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
            <LoadingIndicator />
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="w-20 h-20 bg-gray-600 rounded-lg flex items-center justify-center relative">
      {getFileIcon()}
      {isUploading && (
        <div className="absolute inset-0 bg-black bg-opacity-50 rounded-lg flex items-center justify-center">
          <LoadingIndicator />
        </div>
      )}
    </div>
  );
};

export default FilePreview;
import React from 'react';
import { FileText, Download, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IFile } from "@/types/file";
import { formatFileSize, getFileType, downloadFile } from "@/utils/file";

interface DocumentFileProps {
  file: IFile;
}

const DocumentFile: React.FC<DocumentFileProps> = ({ file }) => {
  const { isPDF, isDocument } = getFileType(file.mimeType);

  const getBackgroundColor = () => {
    if (isPDF) return 'bg-red-600';
    if (isDocument) return 'bg-blue-600';
    return 'bg-gray-600';
  };

  const handleDownload = () => downloadFile(file.fileUrl, file.fileName);
  const handleOpen = () => window.open(file.fileUrl, '_blank');

  return (
    <div className="bg-[#2a2a2a] p-3">
      <div className="flex items-center gap-3">
        <div className={`w-8 h-8 rounded-md flex items-center justify-center ${getBackgroundColor()}`}>
          <FileText className="w-4 h-4 text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-white text-sm font-medium truncate">{file.fileName}</p>
          <span className="text-xs text-gray-400">
            {formatFileSize(file.size)}
          </span>
        </div>
        <div className="flex gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-gray-400 hover:text-white"
            onClick={handleDownload}
          >
            <Download className="w-3 h-3" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="w-6 h-6 text-gray-400 hover:text-white"
            onClick={handleOpen}
          >
            <ExternalLink className="w-3 h-3" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DocumentFile;
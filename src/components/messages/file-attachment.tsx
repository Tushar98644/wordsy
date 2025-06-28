import React from 'react';
import { IFile } from "@/types/file";
import { getFileType } from "@/utils/file";
import ImageFile from './image-file';
import DocumentFile from './document-file';

interface FileAttachmentProps {
  file: IFile;
  isUser: boolean;
}

const FileAttachment: React.FC<FileAttachmentProps> = ({ file, isUser }) => {
  const { isImage } = getFileType(file.mimeType);
  
  const borderColor = isUser ? 'border-gray-600' : 'border-gray-700';

  return (
    <div className={`rounded-lg overflow-hidden border ${borderColor}`}>
      {isImage ? (
        <ImageFile file={file} />
      ) : (
        <DocumentFile file={file} />
      )}
    </div>
  );
};

export default FileAttachment;
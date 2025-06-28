import React from 'react';
import { IFile } from "@/types/file";
import FileAttachment from './file-attachment';

interface MessageFilesProps {
  files: IFile[];
  isUser: boolean;
}

const MessageFiles: React.FC<MessageFilesProps> = ({ files, isUser }) => {
  if (!files || files.length === 0) return null;

  return (
    <div className="mb-3 space-y-2 w-full">
      {files.map((file, idx) => (
        <FileAttachment 
          key={`${file.fileId}-${idx}`} 
          file={file} 
          isUser={isUser} 
        />
      ))}
    </div>
  );
};

export default MessageFiles;
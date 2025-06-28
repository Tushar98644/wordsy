import { useState, useRef } from 'react';
import { nanoid } from 'nanoid';

export const useFileUpload = () => {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileMetadata, setFileMetadata] = useState<{
    fileId: string;
    fileName: string;
    mimeType: string;
    size: number;
  } | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setIsUploading(true);
    setFile(selectedFile);
    setFileType(selectedFile.type);

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const uploadResponse = await fetch('/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      if (!uploadResponse.ok) {
        throw new Error('Upload failed');
      }
      
      const uploadResult = await uploadResponse.json();
      
      const fileId = uploadResult.fileId || nanoid();
      
      setFileUrl(uploadResult.fileUrl);
      setFileMetadata({
        fileId: fileId,
        fileName: uploadResult.fileName || selectedFile.name,
        mimeType: uploadResult.mimeType || selectedFile.type,
        size: uploadResult.size || selectedFile.size,
      });

    } catch (error) {
      console.error('File upload error:', error);
      setFile(null);
      setFileUrl(null);
      setFileMetadata(null);
      setFileType(null);
    } finally {
      setIsUploading(false);
    }
  };

  const removeFile = () => {
    setFile(null);
    setFileUrl(null);
    setFileMetadata(null);
    setFileType(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return {
    file,
    fileUrl,
    fileMetadata,
    fileType,
    fileInputRef,
    isUploading,
    handleFileChange,
    removeFile,
  };
};
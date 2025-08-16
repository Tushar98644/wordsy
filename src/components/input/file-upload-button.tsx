'use client'

import { Button } from "@/components/ui/button";
import {
  FileUpload,
  FileUploadDropzone,
  FileUploadItem,
  FileUploadItemDelete,
  FileUploadItemMetadata,
  FileUploadItemPreview,
  FileUploadItemProgress,
} from "@/components/ui/file-upload";
import { Plus, X } from "lucide-react";
import * as React from "react";
import { toast } from "sonner";
import { nanoid } from 'nanoid';
import { FileMetadata } from '@/types/file';
import axios from 'axios';
import { createPortal } from "react-dom";

interface FileUploadButtonProps {
  onFilesUploaded?: (files: FileMetadata[]) => void;
  clearSignal?: number
}

export function FileUploadButton({ onFilesUploaded, clearSignal }: FileUploadButtonProps) {
  const [files, setFiles] = React.useState<File[]>([]);
  const [uploadedMetadata, setUploadedMetadata] = React.useState<FileMetadata[]>([]);
  const [fileProgressMap, setFileProgressMap] = React.useState<Record<string, number>>({});

  const [portalContainer, setPortalContainer] = React.useState<HTMLElement | null>(null);

  React.useEffect(() => {
    const container = document.getElementById('file-upload-portal');
    setPortalContainer(container);
  }, []);
  
    React.useEffect(() => {
    if (clearSignal !== undefined) {
      setFiles([]);
      setUploadedMetadata([]);
      setFileProgressMap({});
    }
  }, [clearSignal]);

  const updateFileProgress = React.useCallback((file: File, progress: number) => {
    const fileKey = `${file.name}-${file.size}`;
    setFileProgressMap(prev => ({
      ...prev,
      [fileKey]: progress
    }));
  }, []);

  const onUpload = React.useCallback(
    async (
      files: File[],
      {
        onProgress,
        onSuccess,
        onError,
      }: {
        onProgress: (file: File, progress: number) => void;
        onSuccess: (file: File) => void;
        onError: (file: File, error: Error) => void;
      },
    ) => {
      try {
        const uploadPromises = files.map(async (file) => {
          const fileKey = `${file.name}-${file.size}`;

          try {
            updateFileProgress(file, 0);
            onProgress(file, 0);

            const formData = new FormData();
            formData.append('file', file);

            const uploadResponse = await axios.post('/api/v1/upload', formData, {
              onUploadProgress: (progressEvent) => {
                if (progressEvent.total) {
                  const realProgress = Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total
                  );

                  let currentProgress = 0;
                  const progressInterval = setInterval(() => {
                    currentProgress += 10;
                    if (currentProgress >= realProgress) {
                      clearInterval(progressInterval);
                      updateFileProgress(file, realProgress);
                      onProgress(file, realProgress);
                    } else {
                      updateFileProgress(file, currentProgress);
                      onProgress(file, currentProgress);
                    }
                  }, 100);
                }
              },
            });


            if (uploadResponse.status !== 200) {
              throw new Error('Upload failed');
            }

            const uploadResult = uploadResponse.data;
            const fileId = uploadResult.fileId || nanoid();

            const fileMetadata: FileMetadata = {
              cloudflareId: fileId,
              fileName: uploadResult.fileName || file.name,
              fileUrl: uploadResult.fileUrl,
              mimeType: uploadResult.mimeType || file.type,
              size: uploadResult.size || file.size,
            };

            updateFileProgress(file, 100);
            onProgress(file, 100);
            onSuccess(file);

            setUploadedMetadata(prev => [...prev, fileMetadata]);
            toast.success(`${file.name} uploaded successfully`);

          } catch (error) {
            console.error('File upload error:', error);
            updateFileProgress(file, 0);
            onError(
              file,
              error instanceof Error ? error : new Error("Upload failed"),
            );
            toast.error(`Failed to upload ${file.name}`);
          }
        });

        await Promise.all(uploadPromises);
      } catch (error) {
        console.error("Unexpected error during upload:", error);
      }
    },
    [updateFileProgress],
  );

  React.useEffect(() => {
    if (uploadedMetadata.length > 0 && onFilesUploaded) {
      onFilesUploaded(uploadedMetadata);
    }
  }, [uploadedMetadata, onFilesUploaded]);

  const onFileReject = React.useCallback((file: File, message: string) => {
    toast.error("File rejected", {
      description: `"${file.name.length > 20 ? `${file.name.slice(0, 20)}...` : file.name}" - ${message}`,
    });
  }, []);

  return (
    <FileUpload
      value={files}
      onValueChange={setFiles}
      maxFiles={3}
      maxSize={2 * 1024 * 1024}
      className="w-full max-w-md"
      onUpload={onUpload}
      onFileReject={onFileReject}
      multiple
    >
      {portalContainer && files.length > 0 && createPortal(
        <div className="flex gap-2 mb-4">
          {files.map((file, index) => (
            <FileUploadItem key={index} value={file} className="p-0">
              <FileUploadItemPreview className="size-20 rounded-lg">
                <FileUploadItemProgress variant="fill" />
              </FileUploadItemPreview>
              <FileUploadItemMetadata className="sr-only" />
              <FileUploadItemDelete asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="-top-1 -right-1 absolute size-5 rounded-full"
                >
                  <X className="size-3" />
                </Button>
              </FileUploadItemDelete>
            </FileUploadItem>
          ))}
        </div>,
        portalContainer
      )}
      <FileUploadDropzone>
        <div className="flex flex-col items-center gap-1 text-center">
          <Plus className="size-4 ml-2" />
        </div>
      </FileUploadDropzone>
    </FileUpload>
  );
}
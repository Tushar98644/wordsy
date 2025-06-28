import React from 'react';
import { ImageIcon, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IFile } from "@/types/file";
import Image from "next/image";

interface ImageFileProps {
  file: IFile;
}

const ImageFile: React.FC<ImageFileProps> = ({ file }) => {
  const openImage = () => window.open(file.fileUrl, '_blank');

  return (
    <div className="bg-[#2a2a2a] p-2">
      <Image
        src={file.fileUrl} 
        alt={file.fileName}
        className="w-48 h-48 object-cover rounded-md cursor-pointer hover:opacity-90 transition-opacity"
        onClick={openImage}
        width={100}
        height={100}
      />
      <div className="flex items-center justify-between mt-2 px-1">
        <div className="flex items-center gap-2">
          <ImageIcon className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-400 truncate max-w-32">
            {file.fileName}
          </span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="w-6 h-6 text-gray-400 hover:text-white"
          onClick={openImage}
        >
          <ExternalLink className="w-3 h-3" />
        </Button>
      </div>
    </div>
  );
};

export default ImageFile;
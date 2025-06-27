import { useRef, useState } from "react";

export function useFileUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string | null>(null);
  const [fileType, setFileType] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const removeFile = () => {
    setFile(null);
    setFileUrl(null);
    setFileType(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.[0]) return;
    const selectedFile = e.target.files[0];
    setIsUploading(true);

    try {
      const form = new FormData();
      form.append("file", selectedFile);
      const res = await fetch("/api/v1/upload", { method: "POST", body: form });
      if (!res.ok) throw new Error("Upload failed");
      const json = await res.json();
      setFile(selectedFile);
      setFileUrl(json.imgUrl);
      setFileType(json.fileType);
    } catch (error) {
      console.error("Upload failed:", error);
    } finally {
      setIsUploading(false);
    }
  };

  return {
    file,
    fileUrl,
    fileType,
    fileInputRef,
    isUploading,
    handleFileChange,
    removeFile,
  };
}
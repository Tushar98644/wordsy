export interface FileMetadata {
    fileId: string;
    fileName: string;
    mimeType: string;
    size: number;
}

export interface IFile {
    fileId: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    size: number;
    uploadedAt: Date;
}
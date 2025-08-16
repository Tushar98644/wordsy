export interface FileMetadata {
    cloudflareId: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    size: number;
}

export interface File {
    _id: string;
    cloudflareId: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
}
export interface File {
    _id: string;
    fileName: string;
    fileUrl: string;
    mimeType: string;
    size: number;
    createdAt: Date;
    updatedAt: Date;
}
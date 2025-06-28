export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

export const getFileType = (mimeType: string) => {
    const isImage = mimeType.startsWith('image/');
    const isPDF = mimeType.includes('pdf');
    const isDocument = mimeType.includes('document') || mimeType.includes('text');

    return { isImage, isPDF, isDocument };
};

export const getFileDisplayType = (mimeType: string): string => {
    const { isImage, isPDF, isDocument } = getFileType(mimeType);

    if (isPDF) return 'PDF Document';
    if (isImage) return 'Image';
    if (isDocument) return 'Document';
    return 'File';
};
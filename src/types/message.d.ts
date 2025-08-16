import { IFile } from "./file";

export interface Message {
    _id: string;
    role: 'user' | 'assistant';
    content: string;
    files?: IFile[];
    createdAt: Date;
    updatedAt: Date;
}
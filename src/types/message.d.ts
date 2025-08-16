import { File } from "./file";

export interface Message {
    _id: string;
    role: 'user' | 'assistant';
    content: string;
    files?: File[];
    createdAt: Date;
    updatedAt: Date;
}
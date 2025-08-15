import { IFile } from "./file";

export interface Message {
    _id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    timestamp: Date;
    files?: IFile[];
}

export interface MessageContainerProps {
    messages: Message[];
    handleEditMessage: (id: string, content: string) => void;
    handleDeleteMessage: (id: string) => void;
    messagesEndRef: React.RefObject<HTMLDivElement | null>;
}

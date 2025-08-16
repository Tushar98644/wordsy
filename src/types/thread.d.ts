import { Message } from "./message";

export interface Thread {
    _id: string;
    title: string;
    userEmail: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}
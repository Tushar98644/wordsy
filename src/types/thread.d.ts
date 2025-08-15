import { Message } from "./message";

export interface Thread {
    _id: string;
    title: string;
    messages: Message[];
    createdAt: Date;
    updatedAt: Date;
}
import mongoose, { Schema, Document } from 'mongoose';
import { MessageSchema } from './message';

export interface IFile {
  fileName: string;
  fileUrl: string;
  mimeType: string;
  size: number;
}

export interface IMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  files?: IFile[];
}

export interface IThread extends Document {
  title: string;
  userEmail: string;
  messages: IMessage[];
}

const ThreadSchema = new Schema<IThread>({
  title: { type: String, required: true },
  userEmail: { type: String, required: true, index: true },
  messages: [MessageSchema],
}, { timestamps: true });

export const Thread = mongoose.models.Thread || mongoose.model<IThread>('Thread', ThreadSchema);
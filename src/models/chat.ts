import mongoose, { Schema, Document } from 'mongoose';

export interface IFile {
  fileId: string;
  fileName: string;
  fileUrl: string;
  mimeType: string;
  size: number;
  uploadedAt: Date;
}

export interface IMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  files?: IFile[];
}

export interface IChat extends Document {
  _id: string;
  title: string;
  userId: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema({
  id: String,
  role: String,
  content: mongoose.Schema.Types.Mixed,
  timestamp: Date,
  files: [{
    fileId: String,
    fileName: String,
    fileUrl: String,
    mimeType: String,
    size: Number,
    uploadedAt: Date
  }]
}, { _id: false });

const ChatSchema = new Schema<IChat>({
  title: { type: String, required: true },
  userId: { type: String, required: true, index: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

ChatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
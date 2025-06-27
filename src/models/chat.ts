import mongoose, { Schema, Document } from 'mongoose';

export interface IMessage {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
  fileUrl?: string;
  fileType?: string;
}

export interface IChat extends Document {
  _id: string;
  title: string;
  userId: string;
  messages: IMessage[];
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>({
  id: { type: String, required: true },
  role: { type: String, enum: ['user', 'assistant'], required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  fileUrl: { type: String },
  fileType: { type: String }
});

const ChatSchema = new Schema<IChat>({
  title: { type: String, required: true },
  userId: { type: String, required: true, index: true },
  messages: [MessageSchema],
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

// Update the updatedAt field on save
ChatSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

export const Chat = mongoose.models.Chat || mongoose.model<IChat>('Chat', ChatSchema);
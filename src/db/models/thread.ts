import mongoose, { Schema, Document } from 'mongoose';
import { MessageSchema } from './message';

const ThreadSchema = new Schema({
  title: { type: String, required: true },
  userEmail: { type: String, required: true, index: true },
  archived: { type: Boolean, default: false },
  messages: [MessageSchema],
}, { timestamps: true });

export const Thread = mongoose.models.Thread || mongoose.model('Thread', ThreadSchema);
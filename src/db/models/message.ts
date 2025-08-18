import mongoose, { Schema } from "mongoose";

const FileSchema = new Schema({
  fileName: String,
  fileUrl: String,
  mimeType: String,
  size: Number
}, { timestamps: true });

export const MessageSchema = new Schema({
  threadId: { type: Schema.Types.ObjectId, ref: 'Thread', index: true },
  role: String,
  content: mongoose.Schema.Types.Mixed,
  files: [FileSchema],
}, { timestamps: true });

export const Message = mongoose.models.Message || mongoose.model('Message', MessageSchema);
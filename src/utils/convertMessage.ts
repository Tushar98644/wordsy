import type { Message } from "@/types/message";
import type { UIMessage, UIDataTypes, UITools } from "ai";

interface MessageMetadata {
  createdAt?: number;
  updatedAt?: number;
}

export function toUIMessage(
  m: Message
): UIMessage<MessageMetadata, UIDataTypes, UITools> {
  const metadata: MessageMetadata = {};

  if (m.createdAt) {
    const dt = m.createdAt instanceof Date
      ? m.createdAt.getTime()
      : new Date(m.createdAt).getTime();
    if (!isNaN(dt)) metadata.createdAt = dt;
  }

  if (m.updatedAt) {
    const dt = m.updatedAt instanceof Date
      ? m.updatedAt.getTime()
      : new Date(m.updatedAt).getTime();
    if (!isNaN(dt)) metadata.updatedAt = dt;
  }

  const parts: any[] = [
    { type: "text", text: m.content }
  ];

  if (m.files && Array.isArray(m.files) && m.files.length > 0) {
    const fileParts = m.files.map(file => ({
      type: "file",
      url: file.fileUrl,
      filename: file.fileName,
      mediaType: file.mimeType,
    }));
    
    parts.push(...fileParts);
  }

  return {
    id: m._id,
    role: m.role,
    parts,
    metadata: Object.keys(metadata).length ? metadata : undefined,
  };
}

export function toUIMessages(messages: Message[]): UIMessage<MessageMetadata, UIDataTypes, UITools>[] {
  return messages.map(toUIMessage);
}
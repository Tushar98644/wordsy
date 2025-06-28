export interface MemoryMetadata {
    role?: 'user' | 'assistant';
    type?: string;
}

export interface GetContextParams {
    query: string;
    limit?: number;
}

export interface StoreParams {
    content: string;
    metadata?: MemoryMetadata;
}

export interface GetMemoriesParams {
    limit?: number;
}

export interface MemoryItem {
    id: string;
    memory: string;
    timestamp: number;
    user_id: string;
}
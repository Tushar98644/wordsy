export type Chat = {
    _id: string;
    title: string;
};

export type SidebarProps = {
    resetChat: () => void;
    setMessages: (messages: any[]) => void;
    setChatId: (chatId: string) => void;
};

export type ChatItemProps = {
    chat: Chat;
    isSelected: boolean;
    onSelect: () => void;
    onRename: (newTitle: string) => void;
    onDelete: () => void;
};

export type ChatListProps = {
    chats: Chat[];
    selectedChatId: string | null;
    onChatSelect: (chatId: string) => void;
    onChatRename: (chatId: string, newTitle: string) => void;
    onChatDelete: (chatId: string) => void;
};
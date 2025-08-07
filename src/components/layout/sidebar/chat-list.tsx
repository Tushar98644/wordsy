import { ChatListProps } from "@/types";
import { ChatItem } from "./chat-item";

export const ChatList = ({
    chats,
    selectedChatId,
    onChatSelect,
    onChatRename,
    onChatDelete
}: ChatListProps) => (
    <div className="px-1 space-y-0 mx-1">
        {chats.length > 0 ? (
            chats.map((chat) => (
                <ChatItem
                    key={chat._id}
                    chat={chat}
                    isSelected={selectedChatId === chat._id}
                    onSelect={() => onChatSelect(chat._id)}
                    onRename={(newTitle) => onChatRename(chat._id, newTitle)}
                    onDelete={() => onChatDelete(chat._id)}
                />
            ))
        ) : (
            <p className="text-gray-400 text-sm px-2">No chats yet</p>
        )}
    </div>
);
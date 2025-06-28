import { useState } from "react";
import { ChatItemProps } from "@/app/types";

export const ChatItem = ({ 
    chat, 
    isSelected, 
    onSelect, 
    onRename, 
    onDelete 
}: ChatItemProps) => {
    const [isRenaming, setIsRenaming] = useState(false);
    const [renameValue, setRenameValue] = useState(chat.title);
    const [showMenu, setShowMenu] = useState(false);

    const handleRenameSubmit = () => {
        if (renameValue.trim()) {
            onRename(renameValue.trim());
        }
        setIsRenaming(false);
    };

    const handleRenameCancel = () => {
        setIsRenaming(false);
        setRenameValue(chat.title);
    };

    const handleDelete = () => {
        if (confirm("Are you sure you want to delete this chat?")) {
            onDelete();
        }
        setShowMenu(false);
    };

    if (isRenaming) {
        return (
            <div className="p-2">
                <input
                    type="text"
                    value={renameValue}
                    onChange={(e) => setRenameValue(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') handleRenameSubmit();
                        if (e.key === 'Escape') handleRenameCancel();
                    }}
                    onBlur={handleRenameSubmit}
                    className="w-full bg-[#2f2f2f] text-white border border-gray-500 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500"
                    autoFocus
                />
            </div>
        );
    }

    return (
        <div className={`relative group w-full text-left text-sm text-white hover:bg-[#2f2f2f] rounded-lg transition-colors ${isSelected ? "bg-[#2f2f2f]" : ""}`}>
            <button onClick={onSelect} className="w-full p-2 flex items-center justify-between">
                <span className="truncate pr-2">{chat.title}</span>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        setShowMenu(!showMenu);
                    }}
                    className="opacity-0 group-hover:opacity-100 p-1 hover:bg-[#404040] rounded transition-opacity flex-shrink-0"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-gray-400">
                        <circle cx="12" cy="5" r="2" fill="currentColor"/>
                        <circle cx="12" cy="12" r="2" fill="currentColor"/>
                        <circle cx="12" cy="19" r="2" fill="currentColor"/>
                    </svg>
                </button>
            </button>

            {showMenu && (
                <div className="absolute right-0 top-full mt-1 bg-[#2f2f2f] border border-[#404040] rounded-lg shadow-lg z-50 min-w-[120px]">
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsRenaming(true);
                            setShowMenu(false);
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-white hover:bg-[#404040] transition-colors rounded-t-lg"
                    >
                        Rename
                    </button>
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            handleDelete();
                        }}
                        className="w-full text-left px-3 py-2 text-sm text-red-400 hover:bg-[#404040] transition-colors rounded-b-lg"
                    >
                        Delete
                    </button>
                </div>
            )}
        </div>
    );
};
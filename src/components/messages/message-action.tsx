import { Copy, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import { downloadFile } from "@/utils/clipboard";

interface MessageActionsProps {
  messageId: string;
  messageContent: string;
  onEdit: (id: string, content: string) => void;
}

const MessageActions: React.FC<MessageActionsProps> = ({
  messageId,
  messageContent,
  onEdit
}) => {
  const handleCopy = () => downloadFile(messageContent, messageId);
  const handleEdit = () => onEdit(messageId, messageContent);

  return (
    <div className="flex gap-1 mt-2 opacity-0 hover:opacity-100 transition-opacity">
      <Button 
        size="icon" 
        variant="ghost" 
        className="text-white/60 hover:text-white hover:bg-white/10" 
        onClick={handleCopy}
      >
        <Copy className="size-4" />
      </Button>
      <Button 
        size="icon" 
        variant="ghost" 
        className="text-white/60 hover:text-white hover:bg-white/10" 
        onClick={handleEdit}
      >
        <Edit className="size-4" />
      </Button>
    </div>
  );
};

export default MessageActions;
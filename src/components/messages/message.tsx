import { IMessage } from "@/types/message";
import MessageFiles from './message-files';
import MessageContent from './message-content';
import MessageActions from './message-action';

interface MessageProps {
  message: IMessage;
  onEdit: (id: string, content: string) => void;
}

const Message: React.FC<MessageProps> = ({ message, onEdit }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>  
      <div className="max-w-[80%] flex flex-col items-end">
        <MessageFiles files={message.files || []} isUser={isUser} />
        
        <MessageContent content={message.content} isUser={isUser} />
        
        {isUser && (
          <MessageActions
            messageId={message.id}
            messageContent={message.content}
            onEdit={onEdit}
          />
        )}
      </div>
    </div>
  );
};

export default Message;
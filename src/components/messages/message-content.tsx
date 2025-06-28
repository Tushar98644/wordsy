interface MessageContentProps {
  content: string;
  isUser: boolean;
}

const MessageContent: React.FC<MessageContentProps> = ({ content, isUser }) => {
  const getMessageStyles = () => {
    const baseStyles = 'px-6 py-4 text-base whitespace-pre-wrap break-words';
    
    if (isUser) {
      return `${baseStyles} bg-[#2f2f2f] text-white rounded-[30px] shadow-md`;
    }
    
    return `${baseStyles} bg-none text-gray-100 rounded-[30px] rounded-bl-md`;
  };

  if (!content) return null;

  return (
    <div className={getMessageStyles()}>
      <div className="text-white">
        {content}
      </div>
    </div>
  );
};

export default MessageContent;
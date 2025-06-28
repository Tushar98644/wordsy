interface LoadingIndicatorProps {
  size?: 'sm' | 'md';
  color?: 'white' | 'black';
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ 
  size = 'md', 
  color = 'white' 
}) => {
  const dotSize = size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2';
  const colorClass = color === 'white' ? 'bg-white' : 'bg-black';
  
  return (
    <div className="flex space-x-1">
      <div className={`${dotSize} ${colorClass} rounded-full animate-bounce`} />
      <div className={`${dotSize} ${colorClass} rounded-full animate-bounce delay-75`} />
      <div className={`${dotSize} ${colorClass} rounded-full animate-bounce delay-150`} />
    </div>
  );
};

export default LoadingIndicator;
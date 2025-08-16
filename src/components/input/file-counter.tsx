interface FileCounterProps {
  count: number;
}

export default function FileCounter({ count }: FileCounterProps) {
  if (count === 0) return null;
  
  return (
    <div className="text-xs text-muted-foreground bg-accent px-2 py-1 rounded-full">
      {count} file{count > 1 ? 's' : ''}
    </div>
  );
}
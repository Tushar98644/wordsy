export function shouldStoreMessage(content: string): boolean {
  if (!content || content.length < 15) return false;

  const genericPatterns = [
      /^(hi|hello|thanks|ok|yes|no|sure)$/i,
      /^(what|how|why|when|where|do)\s*\?*$/i,
  ];

  if (genericPatterns.some(pattern => pattern.test(content.trim()))) {
      return false;
  }

  const meaningfulPatterns = [
      /my name is|i'm |i am |call me/i,
      /i like|i love|i prefer|i enjoy/i,
      /my hobby|my hobbies|i play|i watch/i,
      /i work|my job|i study/i,
      /remember|important|note that/i,
      /my birthday|i live|i'm from/i,
  ];

  return meaningfulPatterns.some(pattern => pattern.test(content)) || content.length > 50;
}
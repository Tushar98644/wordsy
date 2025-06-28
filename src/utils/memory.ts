export function shouldStoreMessage(content: string): boolean {
    if (!content || content.length < 15) return false;
  
    const genericPatterns = [
      /^(hi|hello|thanks|ok|yes|no)$/i,
      /^(what|how|why|when|where)\s*\?*$/i,
    ];
  
    if (genericPatterns.some(pattern => pattern.test(content.trim()))) return false;
  
    const meaningfulPatterns = [
      /my name is|i'm|i am|call me/i,
      /i like|i love|i prefer|i hate|i dislike/i,
      /i work|my job|i do|i study/i,
      /remember|important|note that|don't forget/i,
      /my birthday|i live|i'm from/i,
      /family|wife|husband|child|parent/i,
    ];
  
    return meaningfulPatterns.some(pattern => pattern.test(content)) || content.length > 50;
  }
  
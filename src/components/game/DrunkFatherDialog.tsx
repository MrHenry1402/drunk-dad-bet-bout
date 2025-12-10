import { cn } from "@/lib/utils";
import { EmotionalState } from "@/lib/gameTypes";
import { useEffect, useState } from "react";

interface DrunkFatherDialogProps {
  message: string;
  emotionalState: EmotionalState;
}

const emotionEmojis: Record<EmotionalState, string> = {
  neutral: '🍺',
  excited: '🍻',
  euphoric: '🎉',
  worried: '😰',
  desperate: '😱',
  resigned: '😔',
  dramatic: '🎭',
  shocked: '💀',
};

const emotionColors: Record<EmotionalState, string> = {
  neutral: 'border-muted-foreground',
  excited: 'border-primary',
  euphoric: 'border-accent',
  worried: 'border-secondary',
  desperate: 'border-destructive',
  resigned: 'border-muted-foreground',
  dramatic: 'border-secondary',
  shocked: 'border-destructive',
};

export function DrunkFatherDialog({ message, emotionalState }: DrunkFatherDialogProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  useEffect(() => {
    setIsTyping(true);
    setDisplayedText('');
    
    let index = 0;
    const interval = setInterval(() => {
      if (index < message.length) {
        setDisplayedText(message.slice(0, index + 1));
        index++;
      } else {
        setIsTyping(false);
        clearInterval(interval);
      }
    }, 30);

    return () => clearInterval(interval);
  }, [message]);

  return (
    <div className={cn(
      "relative bg-card border-4 p-4 min-h-[120px]",
      emotionColors[emotionalState],
      "transition-colors duration-300"
    )}>
      {/* Character portrait area */}
      <div className="absolute -top-3 -left-3 w-16 h-16 bg-muted border-4 border-border flex items-center justify-center text-3xl">
        {emotionEmojis[emotionalState]}
      </div>
      
      {/* Name tag */}
      <div className="absolute -top-3 left-16 bg-secondary text-secondary-foreground px-2 py-1 text-[10px] font-pixel">
        PAPÁ
      </div>
      
      {/* Dialog text */}
      <div className="ml-14 mt-2">
        <p className="text-[10px] leading-relaxed font-pixel text-foreground">
          {displayedText}
          {isTyping && <span className="blink">▌</span>}
        </p>
      </div>
      
      {/* Continue indicator */}
      {!isTyping && (
        <div className="absolute bottom-2 right-2 text-[8px] font-pixel text-muted-foreground blink">
          ▼
        </div>
      )}
      
      {/* Decorative corners */}
      <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-primary" />
      <div className="absolute bottom-0 left-14 w-2 h-2 border-b-2 border-l-2 border-primary" />
    </div>
  );
}

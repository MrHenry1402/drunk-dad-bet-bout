import { cn } from "@/lib/utils";

interface PixelBoxerProps {
  color: 'red' | 'blue';
  isSelected?: boolean;
  isAnimating?: boolean;
  animationType?: 'idle' | 'punch' | 'hit' | 'victory' | 'defeat';
  size?: 'sm' | 'md' | 'lg';
  flipped?: boolean;
}

export function PixelBoxer({ 
  color, 
  isSelected = false, 
  isAnimating = false,
  animationType = 'idle',
  size = 'md',
  flipped = false 
}: PixelBoxerProps) {
  const sizeClasses = {
    sm: 'w-16 h-20',
    md: 'w-24 h-32',
    lg: 'w-32 h-40',
  };

  const colorClasses = {
    red: {
      skin: 'bg-amber-200',
      shorts: 'bg-destructive',
      gloves: 'bg-destructive',
      hair: 'bg-amber-900',
    },
    blue: {
      skin: 'bg-amber-100',
      shorts: 'bg-neon-blue',
      gloves: 'bg-neon-blue',
      hair: 'bg-stone-800',
    },
  };

  const colors = colorClasses[color];

  return (
    <div 
      className={cn(
        sizeClasses[size],
        "relative transition-all duration-200",
        flipped && "scale-x-[-1]",
        isSelected && "scale-110",
        isAnimating && animationType === 'punch' && "animate-punch",
        isAnimating && animationType === 'hit' && "animate-hit",
        isAnimating && animationType === 'victory' && "animate-victory",
        isAnimating && animationType === 'defeat' && "opacity-50"
      )}
    >
      {/* Head */}
      <div className={cn("absolute top-0 left-1/2 -translate-x-1/2 w-8 h-8", colors.skin)}>
        {/* Hair */}
        <div className={cn("absolute -top-1 left-0 right-0 h-3", colors.hair)} />
        {/* Eyes */}
        <div className="absolute top-3 left-1 w-1.5 h-1.5 bg-background" />
        <div className="absolute top-3 right-1 w-1.5 h-1.5 bg-background" />
        {/* Mouth */}
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-3 h-1 bg-background" />
      </div>
      
      {/* Body */}
      <div className={cn("absolute top-8 left-1/2 -translate-x-1/2 w-10 h-10", colors.skin)}>
        {/* Chest detail */}
        <div className="absolute top-2 left-1/2 -translate-x-1/2 w-6 h-4 bg-amber-300/30" />
      </div>
      
      {/* Arms/Gloves */}
      <div className={cn(
        "absolute top-10 -left-1 w-5 h-5",
        colors.gloves,
        isAnimating && animationType === 'punch' && "translate-x-2"
      )} />
      <div className={cn(
        "absolute top-10 -right-1 w-5 h-5",
        colors.gloves
      )} />
      
      {/* Shorts */}
      <div className={cn("absolute top-[4.5rem] left-1/2 -translate-x-1/2 w-10 h-6", colors.shorts)}>
        {/* Belt */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-accent" />
      </div>
      
      {/* Legs */}
      <div className={cn("absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-1")}>
        <div className={cn("w-4 h-8", colors.skin)} />
        <div className={cn("w-4 h-8", colors.skin)} />
      </div>
      
      {/* Selection glow */}
      {isSelected && (
        <div className="absolute inset-0 border-4 border-primary animate-pulse pointer-events-none" />
      )}
    </div>
  );
}

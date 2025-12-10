import { cn } from "@/lib/utils";
import { PixelBoxer } from "./PixelBoxer";
import { Boxer } from "@/lib/gameTypes";

interface BoxingRingProps {
  boxer1: Boxer;
  boxer2: Boxer;
  isSimulating: boolean;
  winner?: Boxer | null;
  selectedBoxer?: Boxer | null;
}

export function BoxingRing({ boxer1, boxer2, isSimulating, winner, selectedBoxer }: BoxingRingProps) {
  const getAnimationType = (boxer: Boxer): 'idle' | 'punch' | 'hit' | 'victory' | 'defeat' => {
    if (!winner) return isSimulating ? 'punch' : 'idle';
    if (boxer.id === winner.id) return 'victory';
    return 'defeat';
  };

  return (
    <div className="relative w-full aspect-video max-w-lg mx-auto">
      {/* Ring background */}
      <div className="absolute inset-0 bg-gradient-to-b from-muted to-background border-4 border-border">
        {/* Ring floor */}
        <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-ring-floor">
          {/* Floor pattern */}
          <div className="absolute inset-0 opacity-20">
            {[...Array(8)].map((_, i) => (
              <div 
                key={i} 
                className="absolute h-full w-px bg-foreground" 
                style={{ left: `${(i + 1) * 12.5}%` }} 
              />
            ))}
          </div>
        </div>
        
        {/* Ropes */}
        {[20, 35, 50].map((top, i) => (
          <div 
            key={i}
            className="absolute left-0 right-0 h-1 bg-ring-ropes"
            style={{ top: `${top}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
          </div>
        ))}
        
        {/* Corner posts */}
        <div className="absolute top-[15%] left-2 w-3 h-[40%] bg-muted-foreground" />
        <div className="absolute top-[15%] right-2 w-3 h-[40%] bg-muted-foreground" />
        
        {/* Fighters */}
        <div className="absolute bottom-[20%] left-[15%]">
          <PixelBoxer 
            color={boxer1.color}
            isSelected={selectedBoxer?.id === boxer1.id}
            isAnimating={isSimulating || !!winner}
            animationType={getAnimationType(boxer1)}
            size="lg"
          />
          {/* Name tag */}
          <div className={cn(
            "absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-pixel px-2 py-1",
            "bg-destructive text-destructive-foreground whitespace-nowrap"
          )}>
            {boxer1.name}
          </div>
        </div>
        
        <div className="absolute bottom-[20%] right-[15%]">
          <PixelBoxer 
            color={boxer2.color}
            isSelected={selectedBoxer?.id === boxer2.id}
            isAnimating={isSimulating || !!winner}
            animationType={getAnimationType(boxer2)}
            size="lg"
            flipped
          />
          {/* Name tag */}
          <div className={cn(
            "absolute -bottom-6 left-1/2 -translate-x-1/2 text-[8px] font-pixel px-2 py-1",
            "bg-neon-blue text-primary-foreground whitespace-nowrap"
          )}>
            {boxer2.name}
          </div>
        </div>
        
        {/* VS or Result */}
        <div className="absolute top-4 left-1/2 -translate-x-1/2">
          {isSimulating ? (
            <span className="text-xl font-pixel text-accent neon-text blink">¡FIGHT!</span>
          ) : winner ? (
            <div className="text-center bounce-in">
              <span className="text-xs font-pixel text-primary neon-text">¡GANADOR!</span>
              <div className="text-lg font-pixel text-accent neon-text">{winner.name}</div>
            </div>
          ) : (
            <span className="text-2xl font-pixel text-secondary neon-text">VS</span>
          )}
        </div>
      </div>
      
      {/* CRT overlay */}
      <div className="absolute inset-0 scanlines pointer-events-none" />
    </div>
  );
}

import { cn } from "@/lib/utils";

interface GameHUDProps {
  balance: number;
  wins: number;
  losses: number;
  winStreak: number;
  loseStreak: number;
}

export function GameHUD({ balance, wins, losses, winStreak, loseStreak }: GameHUDProps) {
  const isLowBalance = balance < 50 && balance > 0;
  const isBankrupt = balance === 0;

  return (
    <div className="flex flex-wrap justify-between items-start gap-4 bg-card border-4 border-border p-4">
      {/* Balance */}
      <div className="text-center">
        <span className="text-[8px] font-pixel text-muted-foreground block mb-1">SALDO</span>
        <div className={cn(
          "text-2xl font-pixel px-3 py-1 border-2",
          isBankrupt 
            ? "text-destructive border-destructive bg-destructive/20 shake" 
            : isLowBalance 
              ? "text-accent border-accent bg-accent/20 blink" 
              : "text-primary border-primary bg-primary/10"
        )}>
          {balance}
          <span className="text-[8px] ml-1">🪙</span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        <div className="text-center">
          <span className="text-[8px] font-pixel text-muted-foreground block mb-1">VICTORIAS</span>
          <span className="text-lg font-pixel text-primary">{wins}</span>
        </div>
        <div className="text-center">
          <span className="text-[8px] font-pixel text-muted-foreground block mb-1">DERROTAS</span>
          <span className="text-lg font-pixel text-destructive">{losses}</span>
        </div>
      </div>

      {/* Streak indicator */}
      {(winStreak >= 2 || loseStreak >= 2) && (
        <div className={cn(
          "text-center px-3 py-2 border-2",
          winStreak >= 2 
            ? "border-primary bg-primary/20" 
            : "border-destructive bg-destructive/20"
        )}>
          <span className="text-[8px] font-pixel text-muted-foreground block">RACHA</span>
          <span className={cn(
            "text-lg font-pixel",
            winStreak >= 2 ? "text-primary neon-text" : "text-destructive"
          )}>
            {winStreak >= 2 ? `🔥 ${winStreak}W` : `💀 ${loseStreak}L`}
          </span>
        </div>
      )}
    </div>
  );
}

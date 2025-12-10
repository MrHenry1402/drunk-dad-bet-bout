import { cn } from "@/lib/utils";
import { Boxer } from "@/lib/gameTypes";
import { MIN_BET, BET_INCREMENT } from "@/lib/gameData";

interface BettingPanelProps {
  boxers: Boxer[];
  selectedBoxer: Boxer | null;
  betAmount: number;
  balance: number;
  isSimulating: boolean;
  onSelectBoxer: (boxer: Boxer) => void;
  onChangeBet: (amount: number) => void;
  onPlaceBet: () => void;
}

export function BettingPanel({
  boxers,
  selectedBoxer,
  betAmount,
  balance,
  isSimulating,
  onSelectBoxer,
  onChangeBet,
  onPlaceBet,
}: BettingPanelProps) {
  const canIncrease = betAmount + BET_INCREMENT <= balance;
  const canDecrease = betAmount - BET_INCREMENT >= MIN_BET;
  const canBet = selectedBoxer && betAmount >= MIN_BET && betAmount <= balance && !isSimulating;
  const isAllIn = betAmount === balance && balance > 0;

  return (
    <div className="space-y-4">
      {/* Boxer Selection */}
      <div className="bg-card border-4 border-border p-4">
        <h3 className="text-[10px] font-pixel text-primary mb-3 neon-text">ELIGE LUCHADOR</h3>
        <div className="flex gap-4 justify-center">
          {boxers.map((boxer) => (
            <button
              key={boxer.id}
              onClick={() => onSelectBoxer(boxer)}
              disabled={isSimulating}
              className={cn(
                "p-3 border-4 transition-all duration-200",
                "hover:scale-105 active:scale-95",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                selectedBoxer?.id === boxer.id 
                  ? "border-primary bg-primary/20 neon-border" 
                  : "border-border bg-muted hover:border-muted-foreground"
              )}
            >
              <div className={cn(
                "w-4 h-4 mx-auto mb-2",
                boxer.color === 'red' ? "bg-destructive" : "bg-neon-blue"
              )} />
              <span className="text-[8px] font-pixel text-foreground block">{boxer.name}</span>
              <span className="text-[6px] font-pixel text-muted-foreground block mt-1">
                {boxer.nickname}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Bet Amount */}
      <div className="bg-card border-4 border-border p-4">
        <h3 className="text-[10px] font-pixel text-primary mb-3 neon-text">CANTIDAD</h3>
        <div className="flex items-center justify-center gap-4">
          <button
            onClick={() => onChangeBet(betAmount - BET_INCREMENT)}
            disabled={!canDecrease || isSimulating}
            className={cn(
              "w-12 h-12 border-4 border-border text-2xl font-pixel",
              "bg-muted hover:bg-destructive hover:border-destructive",
              "transition-all duration-100 arcade-button",
              "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-muted"
            )}
          >
            -
          </button>
          
          <div className={cn(
            "min-w-[120px] text-center py-3 px-4 border-4",
            isAllIn ? "border-accent bg-accent/20" : "border-primary bg-primary/10"
          )}>
            <span className={cn(
              "text-xl font-pixel",
              isAllIn ? "text-accent neon-text" : "text-primary"
            )}>
              {betAmount}
            </span>
            <span className="text-[8px] font-pixel text-muted-foreground block mt-1">
              MONEDAS
            </span>
            {isAllIn && (
              <span className="text-[8px] font-pixel text-accent block mt-1 blink">
                ¡ALL IN!
              </span>
            )}
          </div>
          
          <button
            onClick={() => onChangeBet(betAmount + BET_INCREMENT)}
            disabled={!canIncrease || isSimulating}
            className={cn(
              "w-12 h-12 border-4 border-border text-2xl font-pixel",
              "bg-muted hover:bg-primary hover:border-primary hover:text-primary-foreground",
              "transition-all duration-100 arcade-button",
              "disabled:opacity-30 disabled:cursor-not-allowed disabled:hover:bg-muted"
            )}
          >
            +
          </button>
        </div>
        
        {/* Quick bet buttons */}
        <div className="flex justify-center gap-2 mt-3">
          {[50, 100, balance].map((amount) => (
            <button
              key={amount}
              onClick={() => onChangeBet(Math.min(amount, balance))}
              disabled={isSimulating || amount > balance}
              className={cn(
                "px-2 py-1 text-[8px] font-pixel border-2 border-border",
                "hover:border-primary hover:text-primary transition-colors",
                "disabled:opacity-30 disabled:cursor-not-allowed",
                amount === balance && "text-accent border-accent"
              )}
            >
              {amount === balance ? "MAX" : amount}
            </button>
          ))}
        </div>
      </div>

      {/* Place Bet Button */}
      <button
        onClick={onPlaceBet}
        disabled={!canBet}
        className={cn(
          "w-full py-4 text-sm font-pixel border-4 uppercase tracking-wider",
          "transition-all duration-200",
          canBet 
            ? "bg-primary text-primary-foreground border-primary arcade-button pulse-glow hover:bg-primary/90" 
            : "bg-muted text-muted-foreground border-border cursor-not-allowed"
        )}
      >
        {isSimulating ? "¡PELEANDO!" : "APOSTAR Y SIMULAR"}
      </button>
    </div>
  );
}

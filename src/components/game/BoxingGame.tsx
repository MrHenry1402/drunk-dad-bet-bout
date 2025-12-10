import { useState, useCallback } from "react";
import { GameState, Boxer, DialogEvent } from "@/lib/gameTypes";
import { boxers, INITIAL_BALANCE, MIN_BET, simulateFight } from "@/lib/gameData";
import { getDrunkFatherDialog, getEmotionalState } from "@/lib/drunkFatherDialogs";
import { BoxingRing } from "./BoxingRing";
import { BettingPanel } from "./BettingPanel";
import { DrunkFatherDialog } from "./DrunkFatherDialog";
import { GameHUD } from "./GameHUD";
import { BankruptScreen } from "./BankruptScreen";

const initialState: GameState = {
  balance: INITIAL_BALANCE,
  selectedBoxer: null,
  betAmount: MIN_BET,
  isSimulating: false,
  lastResult: null,
  winStreak: 0,
  loseStreak: 0,
  totalWins: 0,
  totalLosses: 0,
  isBankrupt: false,
};

export function BoxingGame() {
  const [gameState, setGameState] = useState<GameState>(initialState);
  const [currentDialog, setCurrentDialog] = useState<string>(
    "¿Qué tal, campeón? *hic* ¿Listo para perder... digo, ganar dinero?"
  );
  const [winner, setWinner] = useState<Boxer | null>(null);

  const emotionalState = getEmotionalState(
    gameState.balance,
    gameState.winStreak,
    gameState.loseStreak,
    gameState.lastResult
  );

  const triggerDialog = useCallback((event: DialogEvent) => {
    const dialog = getDrunkFatherDialog(event);
    setCurrentDialog(dialog);
  }, []);

  const handleSelectBoxer = useCallback((boxer: Boxer) => {
    setGameState((prev) => ({ ...prev, selectedBoxer: boxer }));
    setWinner(null);
    triggerDialog({ type: 'select_boxer', data: { boxerName: boxer.name } });
  }, [triggerDialog]);

  const handleChangeBet = useCallback((amount: number) => {
    const newAmount = Math.max(MIN_BET, Math.min(amount, gameState.balance));
    const isIncrease = newAmount > gameState.betAmount;
    setGameState((prev) => ({ ...prev, betAmount: newAmount }));
    triggerDialog({ type: 'change_bet', data: { amount: isIncrease ? 1 : -1 } });
  }, [gameState.balance, gameState.betAmount, triggerDialog]);

  const handlePlaceBet = useCallback(() => {
    if (!gameState.selectedBoxer || gameState.isSimulating) return;

    const isAllIn = gameState.betAmount === gameState.balance;
    
    // Trigger bet dialog
    triggerDialog({ type: 'place_bet', data: { isAllIn } });
    
    setGameState((prev) => ({ ...prev, isSimulating: true }));
    setWinner(null);

    // Get opponent
    const opponent = boxers.find((b) => b.id !== gameState.selectedBoxer!.id)!;
    
    // Simulate fight after delay
    setTimeout(() => {
      const playerWins = simulateFight(gameState.selectedBoxer!, opponent);
      const fightWinner = playerWins ? gameState.selectedBoxer! : opponent;
      
      setWinner(fightWinner);
      
      setGameState((prev) => {
        const newWinStreak = playerWins ? prev.winStreak + 1 : 0;
        const newLoseStreak = playerWins ? 0 : prev.loseStreak + 1;
        const newBalance = playerWins 
          ? prev.balance + prev.betAmount 
          : prev.balance - prev.betAmount;
        
        return {
          ...prev,
          isSimulating: false,
          lastResult: playerWins ? 'win' : 'lose',
          winStreak: newWinStreak,
          loseStreak: newLoseStreak,
          totalWins: playerWins ? prev.totalWins + 1 : prev.totalWins,
          totalLosses: playerWins ? prev.totalLosses : prev.totalLosses + 1,
          balance: Math.max(0, newBalance),
          betAmount: Math.min(prev.betAmount, Math.max(0, newBalance)),
          isBankrupt: newBalance <= 0,
        };
      });

      // Trigger result dialog after a short delay
      setTimeout(() => {
        if (playerWins) {
          const newWinStreak = gameState.winStreak + 1;
          triggerDialog({ 
            type: 'win', 
            data: { streakCount: newWinStreak } 
          });
        } else {
          const newLoseStreak = gameState.loseStreak + 1;
          const newBalance = gameState.balance - gameState.betAmount;
          
          if (newBalance <= 0) {
            triggerDialog({ type: 'bankrupt' });
          } else if (newBalance < 50) {
            triggerDialog({ type: 'low_balance', data: { balance: newBalance } });
          } else {
            triggerDialog({ 
              type: 'lose', 
              data: { streakCount: newLoseStreak } 
            });
          }
        }
      }, 500);
    }, 2000);
  }, [gameState, triggerDialog]);

  const handleReset = useCallback(() => {
    setGameState({ ...initialState });
    setWinner(null);
    triggerDialog({ type: 'reset' });
  }, [triggerDialog]);

  return (
    <div className="min-h-screen bg-background p-4 md:p-8 scanlines">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Title */}
        <header className="text-center space-y-2">
          <h1 className="text-2xl md:text-4xl font-pixel text-primary neon-text">
            BOXING BETS
          </h1>
          <p className="text-[8px] md:text-[10px] font-pixel text-accent">
            APUESTAS DE BOXEO RETRO
          </p>
        </header>

        {/* HUD */}
        <GameHUD 
          balance={gameState.balance}
          wins={gameState.totalWins}
          losses={gameState.totalLosses}
          winStreak={gameState.winStreak}
          loseStreak={gameState.loseStreak}
        />

        {/* Main game area */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Ring */}
          <div className="order-1">
            <BoxingRing 
              boxer1={boxers[0]}
              boxer2={boxers[1]}
              isSimulating={gameState.isSimulating}
              winner={winner}
              selectedBoxer={gameState.selectedBoxer}
            />
          </div>

          {/* Betting panel */}
          <div className="order-2">
            <BettingPanel
              boxers={boxers}
              selectedBoxer={gameState.selectedBoxer}
              betAmount={gameState.betAmount}
              balance={gameState.balance}
              isSimulating={gameState.isSimulating}
              onSelectBoxer={handleSelectBoxer}
              onChangeBet={handleChangeBet}
              onPlaceBet={handlePlaceBet}
            />
          </div>
        </div>

        {/* Dialog box */}
        <DrunkFatherDialog 
          message={currentDialog}
          emotionalState={emotionalState}
        />

        {/* Footer */}
        <footer className="text-center">
          <p className="text-[6px] font-pixel text-muted-foreground">
            LAS APUESTAS SON FICTICIAS • NO SE APUESTA DINERO REAL • JUEGO CON RESPONSABILIDAD
          </p>
        </footer>
      </div>

      {/* Bankrupt overlay */}
      {gameState.isBankrupt && <BankruptScreen onReset={handleReset} />}
    </div>
  );
}

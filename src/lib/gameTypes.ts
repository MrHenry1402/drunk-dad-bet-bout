export interface Boxer {
  id: string;
  name: string;
  nickname: string;
  color: 'red' | 'blue';
  winRate: number;
  sprite: string;
}

export interface GameState {
  balance: number;
  selectedBoxer: Boxer | null;
  betAmount: number;
  isSimulating: boolean;
  lastResult: 'win' | 'lose' | null;
  winStreak: number;
  loseStreak: number;
  totalWins: number;
  totalLosses: number;
  isBankrupt: boolean;
}

export type EmotionalState = 
  | 'neutral'
  | 'excited'
  | 'euphoric'
  | 'worried'
  | 'desperate'
  | 'resigned'
  | 'dramatic'
  | 'shocked';

export interface DialogEvent {
  type: 'select_boxer' | 'change_bet' | 'place_bet' | 'win' | 'lose' | 'streak' | 'low_balance' | 'all_in' | 'bankrupt' | 'reset';
  data?: {
    boxerName?: string;
    amount?: number;
    isAllIn?: boolean;
    streakCount?: number;
    balance?: number;
  };
}

import { Boxer } from './gameTypes';

export const INITIAL_BALANCE = 500;
export const MIN_BET = 10;
export const BET_INCREMENT = 10;

export const boxers: Boxer[] = [
  {
    id: 'el-toro',
    name: 'El Toro',
    nickname: 'La Bestia de Tijuana',
    color: 'red',
    winRate: 0.48,
    sprite: 'toro',
  },
  {
    id: 'relampago',
    name: 'Relámpago',
    nickname: 'El Rayo del Sur',
    color: 'blue',
    winRate: 0.52,
    sprite: 'relampago',
  },
];

export function simulateFight(selectedBoxer: Boxer, opponent: Boxer): boolean {
  // Simulate based on win rates with some randomness
  const totalRate = selectedBoxer.winRate + opponent.winRate;
  const selectedChance = selectedBoxer.winRate / totalRate;
  const random = Math.random();
  
  return random < selectedChance;
}

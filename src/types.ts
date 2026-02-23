export type GameState = 'START' | 'MEMORIZE' | 'RECALL' | 'FINISHED';

export interface Person {
  id: string;
  name: string;
  imageUrl: string;
}

export interface GameResult {
  personId: string;
  correct: boolean;
  userAnswer: string;
}

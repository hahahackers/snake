export type Phase = 'idle' | 'running' | 'lost';

export enum Direction {
  Up = 'up',
  Down = 'down',
  Left = 'left',
  Right = 'right',
}

export enum Cell {
  Empty = '_',
  Snake = 'S',
  HeadUp = 'HU',
  HeadRight = 'HR',
  HeadDown = 'HD',
  HeadLeft = 'HL',
  Fruit = 'F',
}

export interface Game {
  board: string[][];
  phase: Phase;
  points: number;
  start: () => void;
}

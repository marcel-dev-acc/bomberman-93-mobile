export enum Direction {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
};

export type GameEventProps = {
  type: 'tick' | 'started' | 'stopped' | 'paused' | 'unpaused' | 'movement' | 'bomb' | 'add-bomb' | 'add-bomb-strength' | 'time-over' | 'winner' | 'draw';
  movement?: Direction;
  winner?: number;
};

export type ActionsProps = {
  touches: any;
  dispatch: any;
  events: GameEventProps[];
};

export type TopLeftPairProps = {
  top: number;
  left: number;
};

export enum FireType {
  up = 'up',
  upEnd = 'up-end',
  down = 'down',
  downEnd = 'down-end',
  left = 'left',
  leftEnd = 'left-end',
  right = 'right',
  rightEnd = 'right-end',
  center = 'center',
};

export const getEndPairFireTpye = (fireTpye: FireType) => {
  switch (fireTpye) {
    case FireType.up:
      return FireType.upEnd;
    case FireType.down:
      return FireType.downEnd;
    case FireType.left:
      return FireType.leftEnd;
    case FireType.right:
      return FireType.rightEnd;
    default:
      return fireTpye;
  }
};

export interface FireTopLeftPairProps extends TopLeftPairProps {
  type: FireType;
};

export enum PerkType {
  bombStrength = 'bomb-strength',
  chaosBackwards = 'chaos-backwards',
  chaosFaster = 'chaos-faster',
  chaosNoBombs = 'chaos-no-bombs',
  chaosSmallBombs = 'chaos-small-bombs',
  bombKick = 'bomb-kick',
  bombNumber = 'bomb-number',
};

// The percentages are incremented by adding the former
// Max is 100%
export enum PerkTypePercentage {
  bombStrength = 25, // 25
  chaosBackwards = 35, // 10
  chaosFaster = 45, // 10
  chaosNoBombs = 55, // 10
  chaosSmallBombs = 65, // 10
  bombKick = 75, // 10
  bombNumber = 100, // 25
};

export type PlayerDetails = {
  hasJoined: boolean;
  secret: string;
  isActive: boolean;
  isReal: boolean;
  avatar: {
    gender: 'male' | 'female';
  };
};

export type SessionDetails = {
  1: PlayerDetails;
  2: PlayerDetails;
  3: PlayerDetails;
  4: PlayerDetails;
  5: PlayerDetails;
  boardType: 'green';
  isRunning: boolean;
  winner: undefined | 0 | 1 | 2 | 3 | 4 | 5; // 0 == draw
  tick: number;
  events: GameEventProps[];
  loopTimer: number;
  timeOver: boolean;
  timeOverLoopTimer: number;
  bombersCount: number;
  boardContents: (string | undefined)[][];
  gridPairs: TopLeftPairProps[][];
  entities: any;
};

export enum ComponentType {
  wall = 'wall',
  brick = 'brick',
  pillar = 'pillar',
  bomber = 'bomber',
  bomb = 'bomb',
  fire = 'fire',
  perk = 'perk',
};
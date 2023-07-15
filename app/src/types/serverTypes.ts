
/* Session types */
export interface HandleCreateSessionData {
  sessionName: string;
};

export interface HandleJoinSessionData extends HandleCreateSessionData {
  playerNumber: 1 | 2 | 3 | 4 | 5;
};

export interface HandleDisconnectSessionData extends HandleJoinSessionData {
  secret: string;
};

export interface HandleTickData extends HandleJoinSessionData {
  secret: string;
  tick: number;
};

export interface HandleEventsData extends HandleJoinSessionData {
  secret: string;
  event: GameEventProps,
};

/* General server types */

export interface JoinSessionGameServerResponse {
  data: HandleJoinSessionData;
  secret: string;
}

export interface EventGameServerResponse {
  data: HandleEventsData;
  state: SessionDetails | {};
}

export interface TickGameServerResponse {
  data: HandleTickData;
  state: SessionDetails | {};
}

export interface NegativeResponse {
  data: any;
  error: string;
};

export enum Direction {
  up = 'up',
  down = 'down',
  left = 'left',
  right = 'right',
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

export type TopLeftPairProps = {
  top: number;
  left: number;
};

export type GameEventProps = {
  type: 'tick' | 'started' | 'stopped' | 'paused' | 'unpaused' | 'movement' | 'bomb' | 'add-bomb' | 'add-bomb-strength' | 'time-over' | 'winner' | 'draw';
  movement?: Direction;
  winner?: number;
};

export interface ServerGameEventProps extends GameEventProps {
  playerNumber: 1 | 2 | 3 | 4 | 5;
};

export type ActionsProps = {
  touches: any;
  dispatch: any;
  events: GameEventProps[];
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

export interface FireTopLeftPairProps extends TopLeftPairProps {
  type: FireType;
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
  events: ServerGameEventProps[];
  loopTimer: number;
  timeOver: boolean;
  timeOverLoopTimer: number;
  bombersCount: number;
  boardContents: (string | undefined)[][];
  gridPairs: TopLeftPairProps[][];
  entities: any;
};

export type SessionNames = {
  [sessionName: string]: SessionDetails;
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

// Type guards below
export const isHandleCreateSessionData = (data: HandleCreateSessionData | unknown): data is HandleCreateSessionData => {
  return (
    (data as HandleJoinSessionData).sessionName !== undefined
  );
};

export const isHandleJoinSessionData = (data: HandleJoinSessionData | unknown): data is HandleJoinSessionData => {
  return (
    (data as HandleJoinSessionData).sessionName !== undefined &&
    (data as HandleJoinSessionData).playerNumber !== undefined &&
    [1, 2, 3, 4, 5].includes((data as HandleJoinSessionData).playerNumber)
  );
};

export const isHandleDisconnectSessionData = (data: HandleDisconnectSessionData | unknown): data is HandleDisconnectSessionData => {
  return (
    (data as HandleDisconnectSessionData).sessionName !== undefined &&
    (data as HandleDisconnectSessionData).playerNumber !== undefined &&
    [1, 2, 3, 4, 5].includes((data as HandleJoinSessionData).playerNumber) &&
    (data as HandleDisconnectSessionData).secret !== undefined
  );
};

export const isHandleEventData = (data: HandleEventsData | unknown): data is HandleEventsData => {
  return (
    (data as HandleEventsData).sessionName !== undefined &&
    (data as HandleEventsData).playerNumber !== undefined &&
    [1, 2, 3, 4, 5].includes((data as HandleJoinSessionData).playerNumber) &&
    (data as HandleEventsData).secret !== undefined &&
    (data as HandleEventsData).event !== undefined &&
    [
      'tick',
      'started',
      'stopped',
      'paused',
      'movement',
      'bomb',
      'add-bomb',
      'add-bomb-strength',
      'time-over',
      'winner',
      'draw',
    ].includes((data as HandleEventsData).event.type)
  );
};

export const isHandleTickData = (data: HandleTickData | unknown): data is HandleTickData => {
  return (
    (data as HandleTickData).sessionName !== undefined &&
    (data as HandleTickData).playerNumber !== undefined &&
    [1, 2, 3, 4, 5].includes((data as HandleJoinSessionData).playerNumber) &&
    (data as HandleTickData).secret !== undefined &&
    (data as HandleTickData).tick !== undefined
  );
};
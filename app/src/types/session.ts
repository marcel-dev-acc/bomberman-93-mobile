export type Avatar = {
  gender: 'male' | 'female';
};

export type Player = {
  number: number;
  name: string;
  isActive: boolean;
  isReal: boolean;
  avatar: Avatar;
};

export type Session = {
  name: string;
  playerNumber: number;
  secret?: string;
  winner: undefined | Player;
  players: Player[];
};

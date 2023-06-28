import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';

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

type ChangePlayerDetails = {
  playerNumber: number;
  player: Player;
};

const defaultAvatar: Avatar = {
  gender: 'male',
};

const initialState: Session = {
  name: '',
  playerNumber: 1,
  winner: undefined,
  players: [
    {
      number: 1,
      name: 'Player 1',
      isActive: true,
      isReal: true,
      avatar: defaultAvatar,
    },
    {
      number: 2,
      name: 'Player 2',
      isActive: true,
      isReal: false,
      avatar: defaultAvatar,
    },
    {
      number: 3,
      name: 'Player 3',
      isActive: true,
      isReal: false,
      avatar: defaultAvatar,
    },
    {
      number: 4,
      name: 'Player 4',
      isActive: true,
      isReal: false,
      avatar: defaultAvatar,
    },
    {
      number: 5,
      name: 'Player 5',
      isActive: true,
      isReal: false,
      avatar: defaultAvatar,
    },
  ],
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState: initialState,
  reducers: {
    changeSessionName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changePlayerNumber: (state, action: PayloadAction<Session>) => {
      state.playerNumber = action.payload.playerNumber;
    },
    changeSecret: (state, action: PayloadAction<string | undefined>) => {
      state.secret = action.payload;
    },
    changeWinner: (state, action: PayloadAction<Player | undefined>) => {
      state.winner = action.payload;
    },
    changePlayersDetails: (state, action: PayloadAction<ChangePlayerDetails>) => {
      state.players[action.payload.playerNumber - 1] = action.payload.player;
    },
    resetSession: (state, action: PayloadAction) => {
      state = initialState;
    },
  }
})

// Action creators are generated for each case reducer function
export const { changeSessionName, changePlayerNumber, changeSecret, changeWinner, changePlayersDetails } = sessionSlice.actions

export default sessionSlice.reducer

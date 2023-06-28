import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';

export enum ScreenType {
  welcome = 'welcome',
  rules = 'rules',
  createSession = 'create-session',
  waitingRoom = 'waiting-room',
  rotate = 'rotate',
  game = 'game',
  winner = 'winner',
  remoteControls = 'remote-controls',
};

type Screens = {
  screen: ScreenType;
  previousScreen?: ScreenType;
  graphicsEnabled?: boolean;
  debuggerEnabled?: boolean;
  musicEnabled?: boolean;
};

const initialState: Screens = {
  screen: ScreenType.welcome,
  previousScreen: ScreenType.welcome,
  graphicsEnabled: true,
  debuggerEnabled: true,
  musicEnabled: true,
};

export const screenSlice = createSlice({
  name: 'screens',
  initialState: initialState,
  reducers: {
    changeScreen: (state, action: PayloadAction<Screens>) => {
      state.previousScreen = state.screen;
      state.screen = action.payload.screen;
    },
    toggleGraphics: (state, action: PayloadAction) => {
      state.graphicsEnabled = !state.graphicsEnabled;
    },
    toggleDebugger: (state, action: PayloadAction) => {
      state.debuggerEnabled = !state.debuggerEnabled;
    },
    toggleMusic: (state, action: PayloadAction<boolean>) => {
      state.musicEnabled = action.payload;
    },
  }
})

// Action creators are generated for each case reducer function
export const { changeScreen, toggleGraphics, toggleDebugger, toggleMusic } = screenSlice.actions

export default screenSlice.reducer

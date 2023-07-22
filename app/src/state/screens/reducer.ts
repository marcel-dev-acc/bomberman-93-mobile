import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {DEBUG} from '../../constants/app';

export enum ScreenType {
  welcome = 'welcome',
  register = 'register',
  rules = 'rules',
  createSession = 'create-session',
  waitingRoom = 'waiting-room',
  joinSession = 'joinSession',
  rotate = 'rotate',
  game = 'game',
  winner = 'winner',
  remoteControls = 'remote-controls',
  settings = 'settings',
}

type Screens = {
  screen: ScreenType;
  previousScreen?: ScreenType;
  graphicsEnabled?: boolean;
  debuggerEnabled?: boolean;
  musicEnabled?: boolean;
  isLoading: boolean;
};

const initialState: Screens = {
  screen: ScreenType.welcome,
  previousScreen: ScreenType.welcome,
  graphicsEnabled: true,
  debuggerEnabled: DEBUG,
  musicEnabled: true,
  isLoading: false,
};

export const screenSlice = createSlice({
  name: 'screens',
  initialState: initialState,
  reducers: {
    changeScreen: (state, action: PayloadAction<ScreenType>) => {
      state.previousScreen = state.screen;
      state.screen = action.payload;
    },
    toggleGraphics: state => {
      state.graphicsEnabled = !state.graphicsEnabled;
    },
    toggleDebugger: state => {
      state.debuggerEnabled = !state.debuggerEnabled;
    },
    toggleMusic: (state, action: PayloadAction<boolean>) => {
      state.musicEnabled = action.payload;
    },
    toggleIsLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  changeScreen,
  toggleGraphics,
  toggleDebugger,
  toggleMusic,
  toggleIsLoading,
} = screenSlice.actions;

export default screenSlice.reducer;

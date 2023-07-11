import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit';
import { Direction } from '../../constants/types';

export type GamepadEvent = {
  action: Direction | 'bomb';
  isPressed: boolean;
};

export type Gamepad = {
  events: GamepadEvent[];
  deviceId?: number;
  bombKey?: number;
  upKey?: number;
  downKey?: number;
  leftKey?: number;
  rightKey?: number;
};

type ReceiveEvent = {
  action: number;
  keyCode: number;
};

const initialState = {
  events: [],
  deviceId: undefined,
};

export const gamepadSlice = createSlice({
  name: 'gamepad',
  initialState: initialState,
  reducers: {
    // receiveEvent: (state, action: PayloadAction<ReceiveEvent>) => {
    //   const isPressed = action.payload.action === 0 ? true : false;
    //   switch (action.payload.keyCode) {
    //     case state.upKey:
    //       state.events.push({
    //         action: Direction.up,
    //         isPressed: isPressed,
    //       });
    //       break;
    //     case state.downKey:
    //       state.events.push({
    //         action: Direction.down,
    //         isPressed: isPressed,
    //       });
    //       break;
    //     case state.leftKey:
    //       state.events.push({
    //         action: Direction.left,
    //         isPressed: isPressed,
    //       });
    //       break;
    //     case state.rightKey:
    //       state.events.push({
    //         action: Direction.right,
    //         isPressed: isPressed,
    //       });
    //       break;
    //     case state.bombKey:
    //       state.events.push({
    //         action: 'bomb',
    //         isPressed: isPressed,
    //       });
    //       break;
    //   }
    // },
    // clearEvents: (state, action: PayloadAction) => {
    //   state.events = [];
    // },
    // setupGamepad: (state, action: PayloadAction<Gamepad>) => {
    //   state.deviceId = action.payload.deviceId;
    //   state.bombKey = action.payload.bombKey;
    //   state.upKey = action.payload.upKey;
    //   state.downKey = action.payload.downKey;
    //   state.leftKey = action.payload.leftKey;
    //   state.rightKey = action.payload.rightKey;
    // },
  }
})

// Action creators are generated for each case reducer function
// export const { receiveEvent, setupGamepad, clearEvents } = gamepadSlice.actions

export default gamepadSlice.reducer

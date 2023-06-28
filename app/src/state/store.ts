import { configureStore } from '@reduxjs/toolkit';
import screenReducer from './screens/reducer';
import sessionReducer from './session/reducer';
import gamepadReducer from './gamepad/reducer';
import errorsReducer from './errors/reducer';

export default configureStore({
  reducer: {
    screens: screenReducer,
    session: sessionReducer,
    gamepad: gamepadReducer,
    errors: errorsReducer,
  }
});
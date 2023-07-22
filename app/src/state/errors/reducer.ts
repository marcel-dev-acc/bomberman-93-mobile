import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';

export type UIError = {
  title: string;
  value: string;
};

export type UIErrors = {
  errors: UIError[];
};

const initialState: UIErrors = {
  errors: [],
};

export const errorsSlice = createSlice({
  name: 'errors',
  initialState: initialState,
  reducers: {
    addError: (state, action: PayloadAction<UIError>) => {
      state.errors = [...state.errors, action.payload];
    },
    removeError: (state, action: PayloadAction<number>) => {
      state.errors = [
        ...state.errors.filter((error, idx) => action.payload !== idx),
      ];
    },
  },
});

// Action creators are generated for each case reducer function
export const {addError, removeError} = errorsSlice.actions;

export default errorsSlice.reducer;

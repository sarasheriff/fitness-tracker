import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  value: string;
}

const initialState: CounterState = {
  value: "00:00",
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    setValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { increment, setValue } = counterSlice.actions;
export default counterSlice.reducer;
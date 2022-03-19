import { createSlice } from "@reduxjs/toolkit";

export interface State {
  progress: number;
}

const initialState: State = {
  progress: 0,
};

export const slice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    startProgress: (state: State) => {
      state.progress = 10;
    },
    incrementProgress: (state: State) => {
      state.progress += 10;
    },
    stopProgress: (state: State) => {
      state.progress = 0;
    },
  },
});

export const { startProgress, incrementProgress, stopProgress } = slice.actions;
export default slice.reducer;

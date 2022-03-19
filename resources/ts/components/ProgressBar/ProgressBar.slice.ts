import { createSlice } from "@reduxjs/toolkit";
import { delay, put, select, takeLatest } from "redux-saga/effects";
import { RootState } from "../../store";

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

function* autoIncrementProgress() {
  const getProgress = (store: RootState) => store.progressBar.progress;
  const canProgress = function* () {
    const progress: number = yield select(getProgress);
    return progress && progress < 90;
  };
  while ((yield canProgress()) as boolean) {
    yield delay(100);
    yield put(incrementProgress());
  }
}

export function* onProgressBarStartProgress() {
  yield takeLatest(startProgress, autoIncrementProgress);
}

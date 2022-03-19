import { delay, put, select, takeLatest } from "redux-saga/effects";
import { RootState } from "../../store";
import { incrementProgress, startProgress } from "./ProgressBar.slice";

function* autoIncrementProgress() {
  const getProgress = (store: RootState) => store.progressBar.progress;
  const canProgress = function* () {
    const progress: number = yield select(getProgress);
    return progress !== 0 && progress < 90;
  };
  while ((yield canProgress()) as boolean) {
    yield delay(100);
    yield put(incrementProgress());
  }
}

export function* onProgressBarStartProgress() {
  yield takeLatest(startProgress, autoIncrementProgress);
}

import { all } from "redux-saga/effects";
import { autoRemoveAlert } from "./components/Alert/Alert.slice";
import { onProgressBarStartProgress } from "./components/ProgressBar/ProgressBar.slice";

export default function* rootSaga() {
  yield all([autoRemoveAlert(), onProgressBarStartProgress()]);
}

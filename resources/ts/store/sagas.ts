import { all } from "redux-saga/effects";
import { onAlertReplace } from "../components/Alert/Alert.saga";
import { onProgressBarStartProgress } from "../components/ProgressBar/ProgressBar.saga";

export default function* sagas() {
  yield all([onAlertReplace(), onProgressBarStartProgress()]);
}

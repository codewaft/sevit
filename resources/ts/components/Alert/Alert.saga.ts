import { delay, put, takeLatest } from "redux-saga/effects";
import { removeAlert, replaceAlert } from "./Alert.slice";

function* autoRemoveAlert() {
  yield delay(4000);
  yield put(removeAlert());
}

export function* onAlertReplace() {
  yield takeLatest(replaceAlert, autoRemoveAlert);
}

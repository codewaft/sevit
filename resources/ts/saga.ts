import { all } from "redux-saga/effects";
import { autoRemoveAlert } from "./components/Alert/Alert.slice";

export default function* rootSaga() {
  yield all([autoRemoveAlert()]);
}

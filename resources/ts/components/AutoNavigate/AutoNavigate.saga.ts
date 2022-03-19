import { put, takeLatest } from "redux-saga/effects";
import { replaceRoute, resetRoute } from "./AutoNavigate.slice";

function* resetNavigateRoute() {
  yield put(resetRoute());
}

export default function* onAutoNavigateReplaceRoute() {
  yield takeLatest(replaceRoute, resetNavigateRoute);
}

import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import sagas from "./sagas";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  middleware: (middleware) => {
    return middleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(sagas);

export default store;

export type GetStateFunc = typeof store.getState;
export type RootState = ReturnType<GetStateFunc>;
export type RootDispatch = typeof store.dispatch;

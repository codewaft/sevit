import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import reducers from "./reducers";
import saga from "./saga";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: reducers,
  middleware: (middleware) => {
    return middleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(saga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

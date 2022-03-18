import { configureStore } from "@reduxjs/toolkit";
import createSagaMiddleware from "redux-saga";
import saga from "./saga";
import groupsReducer from "./views/Groups/Groups.slice";
import alertReducer from "./components/Alert/Alert.slice";

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    groups: groupsReducer,
    alert: alertReducer,
  },
  middleware: (middleware) => {
    return middleware().concat(sagaMiddleware);
  },
});

sagaMiddleware.run(saga);

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./views/Groups/Groups.slice";

const store = configureStore({
  reducer: {
    groups: groupsReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;

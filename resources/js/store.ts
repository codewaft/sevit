import { configureStore } from "@reduxjs/toolkit";
import groupsReducer from "./views/Groups/Groups.slice";

export default configureStore({
  reducer: {
    groups: groupsReducer,
  },
});

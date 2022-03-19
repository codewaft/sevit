import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Type } from "./Alert";

interface Alert {
  type: Type;
  message: string;
}

export interface State {
  alert: Alert | null;
}

const initialState: State = {
  alert: null,
};

export const slice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    replaceAlert: (state: State, action: PayloadAction<Alert>) => {
      state.alert = action.payload;
    },
    removeAlert: (state: State) => {
      state.alert = null;
    },
  },
});

export const { replaceAlert, removeAlert } = slice.actions;
export default slice.reducer;

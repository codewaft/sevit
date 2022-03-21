import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Type as NotifyType } from "../Notify";

type Action = "groupDelete" | "templateDelete";

export interface Confirm {
  id: number;
  action: Action;
  type: NotifyType;
  message: string;
}

export interface State {
  confirm: Confirm | null;
}

const initialState: State = {
  confirm: null,
};

export const slice = createSlice({
  name: "confirm",
  initialState,
  reducers: {
    replaceConfirm: (state: State, action: PayloadAction<Confirm>) => {
      state.confirm = action.payload;
    },
    removeConfirm: (state: State) => {
      state.confirm = null;
    },
  },
});

export const { replaceConfirm, removeConfirm } = slice.actions;
export default slice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ModalName =
  | "broadcastCreate"
  | "broadcast"
  | "broadcastMessages"
  | "broadcastEdit"
  | "templateCreate"
  | "templateEdit"
  | "contactCreate"
  | "contactEdit"
  | "groupCreate"
  | "groupEdit";

export interface State {
  active: ModalName | null;
}

const initialState: State = {
  active: null,
};

export const slice = createSlice({
  name: "modals",
  initialState,
  reducers: {
    replaceActive: (state: State, action: PayloadAction<ModalName>) => {
      state.active = action.payload;
    },
    resetActive: (state: State) => {
      state.active = null;
    },
  },
});

export const { replaceActive, resetActive } = slice.actions;
export default slice.reducer;

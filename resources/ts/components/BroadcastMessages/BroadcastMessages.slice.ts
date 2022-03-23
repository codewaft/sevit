import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Broadcast } from "../../apis/broadcast.api";

export interface State {
  id: number | null;
  broadcast: Broadcast | null;
}

const initialState: State = {
  id: null,
  broadcast: null,
};

export const slice = createSlice({
  name: "broadcastMessages",
  initialState,
  reducers: {
    replaceId(state: State, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    replaceBroadcast(state: State, action: PayloadAction<Broadcast>) {
      state.broadcast = action.payload;
    },
    resetState: (state: State) => {
      state.id = initialState.id;
      state.broadcast = initialState.broadcast;
    },
  },
});

export const { replaceId, replaceBroadcast, resetState } = slice.actions;
export default slice.reducer;

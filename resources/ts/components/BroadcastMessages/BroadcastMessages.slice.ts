import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Broadcast, Message } from "../../apis/broadcast.api";
import { PaginateResponse } from "../../services/api.service";

export interface State {
  id: number | null;
  broadcast: Broadcast | null;
  messagePaginate: PaginateResponse<Message[]> | null;
}

const initialState: State = {
  id: null,
  broadcast: null,
  messagePaginate: null,
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
    replaceMessagePaginate: (state: State, action: PayloadAction<State["messagePaginate"]>) => {
      state.messagePaginate = action.payload;
    },
    resetState: (state: State) => {
      state.id = initialState.id;
      state.broadcast = initialState.broadcast;
      state.messagePaginate = initialState.messagePaginate;
    },
  },
});

export const { replaceId, replaceBroadcast, replaceMessagePaginate, resetState } = slice.actions;
export default slice.reducer;

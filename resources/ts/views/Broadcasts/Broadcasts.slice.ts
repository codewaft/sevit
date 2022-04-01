import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findIndex, reject } from "lodash";
import { Broadcast } from "../../apis/broadcast.api";
import { PaginateResponse } from "../../services/api.service";

export interface State {
  paginate: PaginateResponse<Broadcast[]> | null;
}

const initialState: State = {
  paginate: null,
};

export const slice = createSlice({
  name: "broadcasts",
  initialState,
  reducers: {
    replacePaginate: (state: State, action: PayloadAction<State["paginate"]>) => {
      state.paginate = action.payload;
    },
    addPaginateBroadcast: (state: State, action: PayloadAction<Broadcast>) => {
      if (state.paginate) {
        state.paginate.data.unshift(action.payload);
      }
    },
    updatePaginateBroadcast: (state: State, action: PayloadAction<Broadcast>) => {
      if (state.paginate) {
        const updatableIndex = findIndex(state.paginate.data, { id: action.payload.id });
        if (updatableIndex >= 0) {
          state.paginate.data.splice(updatableIndex, 1, action.payload);
        }
      }
    },
    removePaginateBroadcast: (state: State, action: PayloadAction<number>) => {
      if (state.paginate) {
        const data = reject(state.paginate.data, (broadcast) => broadcast.id === action.payload);
        state.paginate.data = data;
      }
    },
  },
});

export const {
  replacePaginate,
  addPaginateBroadcast,
  updatePaginateBroadcast,
  removePaginateBroadcast,
} = slice.actions;
export default slice.reducer;

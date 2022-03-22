import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reject } from "lodash";
import { Broadcast } from "../../apis/broadcast.api";
import { PaginateResponse } from "../../services/request.service";

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
    removePaginateBroadcast: (state: State, action: PayloadAction<number>) => {
      if (state.paginate) {
        const data = reject(state.paginate.data, (broadcast) => broadcast.id === action.payload);
        state.paginate.data = data;
      }
    },
  },
});

export const { replacePaginate, removePaginateBroadcast } = slice.actions;
export default slice.reducer;

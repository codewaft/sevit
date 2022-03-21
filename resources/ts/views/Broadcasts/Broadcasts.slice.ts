import { createSlice, PayloadAction } from "@reduxjs/toolkit";
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
  },
});

export const { replacePaginate } = slice.actions;
export default slice.reducer;

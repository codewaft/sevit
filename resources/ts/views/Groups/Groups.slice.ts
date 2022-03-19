import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../../apis/group.api";
import { PaginateResponse } from "../../services/request.service";

export interface State {
  paginate: PaginateResponse<Group[]> | null;
}

const initialState: State = {
  paginate: null,
};

export const slice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    replacePaginate: (state: State, action: PayloadAction<State["paginate"]>) => {
      state.paginate = action.payload;
    },
  },
});

export const { replacePaginate } = slice.actions;
export default slice.reducer;

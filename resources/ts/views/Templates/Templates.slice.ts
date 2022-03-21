import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Template } from "../../apis/template.api";
import { PaginateResponse } from "../../services/request.service";

export interface State {
  paginate: PaginateResponse<Template[]> | null;
}

const initialState: State = {
  paginate: null,
};

export const slice = createSlice({
  name: "templates",
  initialState,
  reducers: {
    replacePaginate: (state: State, action: PayloadAction<State["paginate"]>) => {
      state.paginate = action.payload;
    },
  },
});

export const { replacePaginate } = slice.actions;
export default slice.reducer;

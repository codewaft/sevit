import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reject } from "lodash";
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
    removePaginateTemplate: (state: State, action: PayloadAction<number>) => {
      if (state.paginate) {
        const data = reject(state.paginate.data, (template) => template.id === action.payload);
        state.paginate.data = data;
      }
    },
  },
});

export const { replacePaginate, removePaginateTemplate } = slice.actions;
export default slice.reducer;

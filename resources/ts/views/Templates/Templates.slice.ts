import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findIndex, reject } from "lodash";
import { Template } from "../../apis/template.api";
import { PaginateResponse } from "../../services/api.service";

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
    addPaginateTemplate: (state: State, action: PayloadAction<Template>) => {
      if (state.paginate) {
        state.paginate.data.unshift(action.payload);
      }
    },
    updatePaginateTemplate: (state: State, action: PayloadAction<Template>) => {
      if (state.paginate) {
        const updatableIndex = findIndex(state.paginate.data, { id: action.payload.id });
        if (updatableIndex >= 0) {
          state.paginate.data.splice(updatableIndex, 1, action.payload);
        }
      }
    },
    removePaginateTemplate: (state: State, action: PayloadAction<number>) => {
      if (state.paginate) {
        const data = reject(state.paginate.data, (template) => template.id === action.payload);
        state.paginate.data = data;
      }
    },
  },
});

export const {
  replacePaginate,
  addPaginateTemplate,
  updatePaginateTemplate,
  removePaginateTemplate,
} = slice.actions;
export default slice.reducer;

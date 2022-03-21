import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { reject } from "lodash";
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
    removePaginateGroup: (state: State, action: PayloadAction<number>) => {
      if (state.paginate) {
        const data = reject(state.paginate.data, (group) => group.id === action.payload);
        state.paginate.data = data;
      }
    },
  },
});

export const { replacePaginate, removePaginateGroup } = slice.actions;
export default slice.reducer;

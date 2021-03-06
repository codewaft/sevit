import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findIndex, reject } from "lodash";
import { Group } from "../../apis/group.api";
import { PaginateResponse } from "../../services/api.service";

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
    addPaginateGroup: (state: State, action: PayloadAction<Group>) => {
      if (state.paginate) {
        state.paginate.data.unshift(action.payload);
      }
    },
    updatePaginateGroup: (state: State, action: PayloadAction<Group>) => {
      if (state.paginate) {
        const updatableIndex = findIndex(state.paginate.data, { id: action.payload.id });
        if (updatableIndex >= 0) {
          state.paginate.data.splice(updatableIndex, 1, action.payload);
        }
      }
    },
    removePaginateGroup: (state: State, action: PayloadAction<number>) => {
      if (state.paginate) {
        const data = reject(state.paginate.data, (group) => group.id === action.payload);
        state.paginate.data = data;
      }
    },
  },
});

export const { replacePaginate, removePaginateGroup, addPaginateGroup, updatePaginateGroup } =
  slice.actions;
export default slice.reducer;

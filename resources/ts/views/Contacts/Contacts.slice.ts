import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { findIndex } from "lodash";
import { Contact } from "../../apis/contact.api";
import { PaginateResponse } from "../../services/request.service";

export interface State {
  paginate: PaginateResponse<Contact[]> | null;
}

const initialState: State = {
  paginate: null,
};

export const slice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    replacePaginate: (state: State, action: PayloadAction<State["paginate"]>) => {
      state.paginate = action.payload;
    },
    addPaginateContact: (state: State, action: PayloadAction<Contact>) => {
      if (state.paginate) {
        state.paginate.data.unshift(action.payload);
      }
    },
    updatePaginateContact: (state: State, action: PayloadAction<Contact>) => {
      if (state.paginate) {
        const updatableIndex = findIndex(state.paginate.data, { id: action.payload.id });
        if (updatableIndex >= 0) {
          state.paginate.data.splice(updatableIndex, 1, action.payload);
        }
      }
    },
  },
});

export const { replacePaginate, addPaginateContact, updatePaginateContact } = slice.actions;
export default slice.reducer;

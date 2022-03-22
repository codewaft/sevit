import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../../apis/group.api";

export interface Form {
  groups: number[];
}

export interface State {
  id: number | null;
  groups: Group[];
  form: Form;
}

const initialState: State = {
  id: null,
  groups: [],
  form: {
    groups: [],
  },
};

export const slice = createSlice({
  name: "contactEdit",
  initialState,
  reducers: {
    replaceId(state: State, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    replaceForm(state: State, action: PayloadAction<Form>) {
      state.form = action.payload;
    },
    replaceFormGroups(state: State, action: PayloadAction<number[]>) {
      state.form.groups = action.payload;
    },
    replaceGroups(state: State, action: PayloadAction<Group[]>) {
      state.groups = action.payload;
    },
    resetState: (state: State) => {
      state.id = initialState.id;
      state.form = initialState.form;
    },
  },
});

export const { replaceId, replaceForm, replaceFormGroups, replaceGroups, resetState } =
  slice.actions;
export default slice.reducer;

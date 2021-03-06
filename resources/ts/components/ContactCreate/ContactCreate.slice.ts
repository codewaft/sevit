import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Group } from "../../apis/group.api";

interface Form {
  name: string;
  phone: string;
  groups: number[];
}

export interface State {
  groups: Group[];
  form: Form;
}

const initialState: State = {
  groups: [],
  form: {
    name: "",
    phone: "",
    groups: [],
  },
};

export const slice = createSlice({
  name: "contactCreate",
  initialState,
  reducers: {
    replaceGroups: (state: State, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    replaceFormName: (state: State, action: PayloadAction<string>) => {
      state.form.name = action.payload;
    },
    replaceFormPhone: (state: State, action: PayloadAction<string>) => {
      state.form.phone = action.payload;
    },
    replaceFormGroups: (state: State, action: PayloadAction<number[]>) => {
      state.form.groups = action.payload;
    },
    resetState: (state: State) => {
      state.groups = initialState.groups;
      state.form = initialState.form;
    },
  },
});

export const { replaceGroups, replaceFormGroups, replaceFormName, replaceFormPhone, resetState } =
  slice.actions;
export default slice.reducer;

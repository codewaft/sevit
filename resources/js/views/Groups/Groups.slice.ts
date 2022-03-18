import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Group {
  id: number;
  title: string;
  deleted_at: string | null;
  created_at: string;
  updated_at: string;
}

export interface State {
  groups: Group[];
}

export const counterSlice = createSlice({
  name: "groups",
  initialState: {
    groups: [],
  },
  reducers: {
    replaceGroups: (state: State, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
  },
});

export const { replaceGroups } = counterSlice.actions;
export default counterSlice.reducer;

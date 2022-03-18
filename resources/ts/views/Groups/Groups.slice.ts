import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootDispatch } from "../../store";

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

const initialState: State = {
  groups: [],
};

export const counterSlice = createSlice({
  name: "groups",
  initialState,
  reducers: {
    replaceGroups: (state: State, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
  },
});

export const { replaceGroups } = counterSlice.actions;
export default counterSlice.reducer;

export const paginateGroups = async (dispatch: RootDispatch) => {
  // TODO: update api
  const response = await fetch("https://api.sampleapis.com/wines/reds");
  const groups = (await response.json()) as Group[];
  dispatch(replaceGroups(groups));
};

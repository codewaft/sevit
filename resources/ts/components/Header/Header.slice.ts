import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "../../apis/user.api";

export interface State {
  heading: string;
  user: User | null;
}

const initialState: State = {
  heading: "",
  user: null,
};

export const slice = createSlice({
  name: "header",
  initialState,
  reducers: {
    replaceHeading: (state: State, action: PayloadAction<string>) => {
      state.heading = action.payload;
    },
    replaceUser: (state: State, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
  },
});

export const { replaceHeading, replaceUser } = slice.actions;
export default slice.reducer;

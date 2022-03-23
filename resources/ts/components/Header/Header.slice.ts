import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  heading: string;
}

const initialState: State = {
  heading: "",
};

export const slice = createSlice({
  name: "header",
  initialState,
  reducers: {
    replaceHeading: (state: State, action: PayloadAction<string>) => {
      state.heading = action.payload;
    },
  },
});

export const { replaceHeading } = slice.actions;
export default slice.reducer;

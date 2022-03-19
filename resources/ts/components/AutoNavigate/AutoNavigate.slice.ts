import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  route: string | null;
}

const initialState: State = {
  route: null,
};

export const slice = createSlice({
  name: "autoNavigate",
  initialState,
  reducers: {
    replaceRoute: (state: State, action: PayloadAction<string>) => {
      state.route = action.payload;
    },
    resetRoute: (state: State) => {
      state.route = null;
    },
  },
});

export const { replaceRoute, resetRoute } = slice.actions;
export default slice.reducer;

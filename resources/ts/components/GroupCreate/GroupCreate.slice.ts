import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Form {
  title: string;
}

export interface State {
  form: Form;
}

const initialState: State = {
  form: {
    title: "",
  },
};

export const slice = createSlice({
  name: "groupCreate",
  initialState,
  reducers: {
    replaceTitle(state: State, action: PayloadAction<string>) {
      state.form.title = action.payload;
    },
    clearForm: (state: State) => {
      state.form = {
        title: "",
      };
    },
  },
});

export const { replaceTitle, clearForm } = slice.actions;
export default slice.reducer;

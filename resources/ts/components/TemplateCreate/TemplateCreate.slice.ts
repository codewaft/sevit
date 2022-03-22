import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Form {
  title: string;
  content: string;
}

export interface State {
  form: Form;
}

const initialState: State = {
  form: {
    title: "",
    content: "",
  },
};

export const slice = createSlice({
  name: "templateCreate",
  initialState,
  reducers: {
    replaceTitle(state: State, action: PayloadAction<string>) {
      state.form.title = action.payload;
    },
    replaceContent(state: State, action: PayloadAction<string>) {
      state.form.content = action.payload;
    },
    clearForm: (state: State) => {
      state.form = {
        title: "",
        content: "",
      };
    },
  },
});

export const { replaceTitle, replaceContent, clearForm } = slice.actions;
export default slice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Form {
  title: string;
  content: string;
}

export interface State {
  id: number | null;
  form: Form;
}

const initialState: State = {
  id: null,
  form: {
    title: "",
    content: "",
  },
};

export const slice = createSlice({
  name: "templateEdit",
  initialState,
  reducers: {
    replaceId(state: State, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    replaceTitle(state: State, action: PayloadAction<string>) {
      state.form.title = action.payload;
    },
    replaceContent(state: State, action: PayloadAction<string>) {
      state.form.content = action.payload;
    },
    replaceForm(state: State, action: PayloadAction<Form>) {
      state.form = action.payload;
    },
    resetState: (state: State) => {
      state.id = initialState.id;
      state.form = initialState.form;
    },
  },
});

export const { replaceId, replaceTitle, replaceContent, replaceForm, resetState } = slice.actions;
export default slice.reducer;

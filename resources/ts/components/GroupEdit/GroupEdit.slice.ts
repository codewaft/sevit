import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Form {
  title: string;
}

export interface State {
  id: number | null;
  form: Form;
}

const initialState: State = {
  id: null,
  form: {
    title: "",
  },
};

export const slice = createSlice({
  name: "groupEdit",
  initialState,
  reducers: {
    replaceId(state: State, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    replaceTitle(state: State, action: PayloadAction<string>) {
      state.form.title = action.payload;
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

export const { replaceId, replaceTitle, replaceForm, resetState } = slice.actions;
export default slice.reducer;

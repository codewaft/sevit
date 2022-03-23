import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Form {
  username: string;
  password: string;
}

export interface State {
  form: Form;
}

const initialState: State = {
  form: {
    username: "",
    password: "",
  },
};

export const slice = createSlice({
  name: "signIn",
  initialState,
  reducers: {
    replaceFormUsername: (state: State, action: PayloadAction<string>) => {
      state.form.username = action.payload;
    },
    replaceFormPassword: (state: State, action: PayloadAction<string>) => {
      state.form.password = action.payload;
    },
  },
});

export const { replaceFormUsername, replaceFormPassword } = slice.actions;
export default slice.reducer;

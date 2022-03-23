import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface State {
  contacts: File | null;
}

const initialState: State = {
  contacts: null,
};

export const slice = createSlice({
  name: "contactsImport",
  initialState,
  reducers: {
    replaceContacts: (state: State, action: PayloadAction<State["contacts"]>) => {
      state.contacts = action.payload;
    },
    resetState: (state: State) => {
      state.contacts = initialState.contacts;
    },
  },
});

export const { replaceContacts, resetState } = slice.actions;
export default slice.reducer;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EditRequest } from "../../apis/broadcast.api";
import { Group } from "../../apis/group.api";
import { Template } from "../../apis/template.api";

export interface State {
  id: number | null;
  templates: Template[];
  groups: Group[];
  form: EditRequest;
}

const initialState: State = {
  id: null,
  templates: [],
  groups: [],
  form: {
    title: "",
    template: "",
    target: "",
    groups: [],
    schedule: "",
  },
};

export const slice = createSlice({
  name: "broadcastEdit",
  initialState,
  reducers: {
    replaceId(state: State, action: PayloadAction<number>) {
      state.id = action.payload;
    },
    replaceTemplates: (state: State, action: PayloadAction<Template[]>) => {
      state.templates = action.payload;
    },
    replaceGroups: (state: State, action: PayloadAction<Group[]>) => {
      state.groups = action.payload;
    },
    replaceFormTitle: (state: State, action: PayloadAction<State["form"]["title"]>) => {
      state.form.title = action.payload;
    },
    replaceFormTemplate: (state: State, action: PayloadAction<State["form"]["template"]>) => {
      state.form.template = action.payload;
    },
    replaceFormTarget: (state: State, action: PayloadAction<State["form"]["target"]>) => {
      state.form.target = action.payload;
    },
    replaceFormGroups: (state: State, action: PayloadAction<State["form"]["groups"]>) => {
      state.form.groups = action.payload;
    },
    replaceFormSchedule: (state: State, action: PayloadAction<State["form"]["schedule"]>) => {
      state.form.schedule = action.payload;
    },
    resetFormGroups(state: State) {
      state.form.groups = [];
    },
    replaceForm(state: State, action: PayloadAction<State["form"]>) {
      state.form = action.payload;
    },
    resetState(state: State) {
      state.templates = initialState.templates;
      state.groups = initialState.groups;
      state.form = initialState.form;
    },
  },
});

export const {
  replaceId,
  replaceTemplates,
  replaceGroups,
  replaceFormTitle,
  replaceFormTemplate,
  replaceFormTarget,
  replaceFormGroups,
  replaceFormSchedule,
  resetFormGroups,
  replaceForm,
  resetState,
} = slice.actions;
export default slice.reducer;

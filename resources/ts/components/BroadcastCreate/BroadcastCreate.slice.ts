import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CreateRequest } from "../../apis/broadcast.api";
import { Group } from "../../apis/group.api";
import { Template } from "../../apis/template.api";

export interface State {
  templates: Template[];
  groups: Group[];
  form: CreateRequest;
}

const initialState: State = {
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
  name: "broadcastCreate",
  initialState,
  reducers: {
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
    resetState(state: State) {
      state.templates = initialState.templates;
      state.groups = initialState.groups;
      state.form = initialState.form;
    },
  },
});

export const {
  replaceTemplates,
  replaceGroups,
  replaceFormTitle,
  replaceFormTemplate,
  replaceFormTarget,
  replaceFormGroups,
  replaceFormSchedule,
  resetFormGroups,
  resetState,
} = slice.actions;
export default slice.reducer;

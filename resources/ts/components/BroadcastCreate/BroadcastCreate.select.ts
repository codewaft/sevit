import { createSelector } from "@reduxjs/toolkit";
import { compact, find, map } from "lodash";
import { RootState } from "../../store/store";
import { Template } from "../../apis/template.api";
import { CreateRequest } from "../../apis/broadcast.api";
import { Group } from "../../apis/group.api";

export const scanShowGroupsSelect = createSelector(
  [(state: RootState) => state.broadcastCreate.form.target],
  (target: CreateRequest["target"]) => {
    return target === "groups";
  }
);

export const groupOptions = createSelector(
  [(state: RootState) => state.broadcastCreate.groups],
  (groups: Group[]) => {
    return map(groups, (group) => {
      return { name: group.title, value: String(group.id) };
    });
  }
);

export const selectedGroupOptions = createSelector(
  [
    (state: RootState) => state.broadcastCreate.groups,
    (state: RootState) => state.broadcastCreate.form.groups,
  ],
  (groups: Group[], selectedGroups: number[]) => {
    const options = map(selectedGroups, (id) => {
      const group = find(groups, (group) => group.id === id);
      if (group) return { name: group.title, value: String(group.id) };
    });
    return compact(options);
  }
);

export const templateOptions = createSelector(
  [(state: RootState) => state.broadcastCreate.templates],
  (templates: Template[]) => {
    return map(templates, (group) => {
      return { name: group.title, value: String(group.id) };
    });
  }
);

export const messagePreviewText = createSelector(
  [
    (state: RootState) => state.broadcastCreate.templates,
    (state: RootState) => state.broadcastCreate.form.template,
  ],
  (templates: Template[], templateId: string) => {
    if (templateId) {
      const template = find(templates, (template) => template.id === Number(templateId));
      if (template) {
        return template.content;
      } else return null;
    }
    return null;
  }
);

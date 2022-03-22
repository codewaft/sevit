import { createSelector } from "@reduxjs/toolkit";
import { filter, includes, map } from "lodash";
import { RootState } from "../../store/store";
import { Option as SelectOption } from "../Select";

export const groupOptions = createSelector(
  [(state: RootState) => state.contactCreate.groups],
  (groups): SelectOption[] => {
    return map(groups, (group) => {
      return { name: group.title, value: String(group.id) };
    });
  }
);

export const selectedGroupOptions = createSelector(
  [(state: RootState) => state.contactCreate],
  (contactCreate): SelectOption[] => {
    const selectedGroupIds = contactCreate.form.groups;
    const selectedGroups = filter(contactCreate.groups, (group) =>
      includes(selectedGroupIds, group.id)
    );
    return map(selectedGroups, (group) => {
      return { name: group.title, value: String(group.id) };
    });
  }
);

import { createSelector } from "@reduxjs/toolkit";
import { find } from "lodash";
import { RootState } from "../../store/store";

export const selectContact = createSelector(
  [(state: RootState) => state.contacts.paginate, (state: RootState, id: number) => id],
  (paginate, id) => {
    return paginate ? find(paginate.data, { id }) : null;
  }
);

import { createSelector } from "@reduxjs/toolkit";
import { find } from "lodash";
import { RootState } from "../../store/store";

export const selectGroup = createSelector(
  [(state: RootState) => state.groups.paginate, (state: RootState, id: number) => id],
  (paginate, id) => {
    return paginate ? find(paginate.data, { id }) : null;
  }
);

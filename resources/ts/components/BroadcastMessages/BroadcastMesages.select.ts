import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

export const selectBroadcastCountStatus = createSelector(
  [(state: RootState) => state.broadcastMessages.broadcast],
  (broadcast) => {
    if (broadcast) {
      const { messagesCount, completedMessagesCount } = broadcast;
      return `(${completedMessagesCount}/${messagesCount})`;
    }
  }
);

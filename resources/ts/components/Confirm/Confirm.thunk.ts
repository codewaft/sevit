import { GetStateFunc, RootDispatch } from "../../store/store";
import { deleteBroadcastConfirm } from "../../views/Broadcasts/Broadcasts.thunk";
import { deleteContactConfirm } from "../../views/Contacts/Contacts.thunk";
import { deleteGroupConfirm } from "../../views/Groups/Groups.thunk";
import { deleteTemplateConfirm } from "../../views/Templates/Templates.thunk";

export function handleConfirm() {
  return (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { confirm } = getState().confirm;
    if (confirm) {
      switch (confirm.action) {
        case "groupDelete":
          return dispatch(deleteGroupConfirm());
        case "templateDelete":
          return dispatch(deleteTemplateConfirm());
        case "broadcastDelete":
          return dispatch(deleteBroadcastConfirm());
        case "contactDelete":
          return dispatch(deleteContactConfirm());
      }
    }
  };
}

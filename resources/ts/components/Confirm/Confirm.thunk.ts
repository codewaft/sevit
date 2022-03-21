import { GetStateFunc, RootDispatch, RootState } from "../../store/store";
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
      }
    }
  };
}

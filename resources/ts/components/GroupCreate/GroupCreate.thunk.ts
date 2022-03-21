import { GetStateFunc, RootDispatch } from "../../store/store";
import groupApi from "../../apis/group.api";
import { addPaginateGroup } from "../../views/Groups/Groups.slice";
import { resetActive as resetModalActive } from "../Modals/Modals.slice";
import { clearForm } from "./GroupCreate.slice";

export function createGroup() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { form: data } = getState().groupCreate;
    const group = await groupApi.create(data);
    if (group) {
      dispatch(addPaginateGroup(group));
      dispatch(clearForm());
      dispatch(resetModalActive());
    }
  };
}

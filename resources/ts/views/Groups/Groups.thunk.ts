import groupApi from "../../apis/group.api";
import { GetStateFunc, RootDispatch } from "../../store/store";
import { selectGroup } from "./Groups.selector";
import { removePaginateGroup, replacePaginate } from "./Groups.slice";
import { Confirm, removeConfirm, replaceConfirm } from "../../components/Confirm/Confirm.slice";

export function paginateGroups(url?: string) {
  return async (dispatch: RootDispatch) => {
    const paginate = await groupApi.paginate(url);
    dispatch(replacePaginate(paginate));
  };
}

export function deleteGroupConfirm() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { confirm } = getState().confirm;
    if (confirm) {
      const group = await groupApi.delete(confirm.id);
      if (group) {
        dispatch(removePaginateGroup(confirm.id));
        dispatch(removeConfirm());
      }
    }
  };
}

export function deleteGroupPrompt(id: number) {
  return (dispatch: RootDispatch, getState: GetStateFunc) => {
    const group = selectGroup(getState(), id);
    if (group) {
      const confirm: Confirm = {
        id,
        action: "groupDelete",
        type: "warning",
        message: `Are you sure to delete ${group.title} group?`,
      };
      dispatch(replaceConfirm(confirm));
    }
  };
}

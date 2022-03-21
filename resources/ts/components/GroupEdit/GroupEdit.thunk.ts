import groupApi from "../../apis/group.api";
import { GetStateFunc, RootDispatch } from "../../store/store";
import { updatePaginateGroup } from "../../views/Groups/Groups.slice";
import { resetActive as resetModalActive } from "../Modals/Modals.slice";
import { Form, replaceForm } from "./GroupEdit.slice";

export function readGroup() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { id } = getState().groupEdit;
    if (id) {
      const group = await groupApi.read(id);
      if (group) {
        const form: Form = { title: group.title };
        dispatch(replaceForm(form));
      }
    }
  };
}

export function editGroup() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { id, form: data } = getState().groupEdit;
    if (id) {
      const group = await groupApi.edit(id, data);
      if (group) {
        dispatch(updatePaginateGroup(group));
        dispatch(resetModalActive());
      }
    }
  };
}

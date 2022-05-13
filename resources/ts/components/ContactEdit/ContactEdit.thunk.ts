import { map } from "lodash";
import { GetStateFunc, RootDispatch } from "../../store/store";
import contactApi from "../../apis/contact.api";
import groupApi from "../../apis/group.api";
import { Form, replaceForm, replaceGroups, resetState } from "./ContactEdit.slice";
import { resetActive as resetModalActive } from "../Modals/Modals.slice";
import { updatePaginateContact } from "../../views/Contacts/Contacts.slice";

export function readContact() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { id } = getState().contactEdit;
    if (id) {
      const contact = await contactApi.read(id);
      if (contact) {
        const { name, groups } = contact;
        const groupIds = map(groups, (group) => group.id);
        const form: Form = { name, groups: groupIds };
        dispatch(replaceForm(form));
      }
    }
  };
}

export function listGroups() {
  return async (dispatch: RootDispatch) => {
    const groups = await groupApi.list();
    if (groups) {
      dispatch(replaceGroups(groups));
    }
  };
}

export function updateContact() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { id, form: data } = getState().contactEdit;
    if (id) {
      const contact = await contactApi.edit(id, data);
      if (contact) {
        dispatch(updatePaginateContact(contact));
        dispatch(resetState());
        dispatch(resetModalActive());
      }
    }
  };
}

import { GetStateFunc, RootDispatch } from "../../store/store";
import contactApi from "../../apis/contact.api";
import groupApi from "../../apis/group.api";
import { replaceGroups, resetState } from "./ContactCreate.slice";
import { resetActive as resetModalActive } from "../Modals/Modals.slice";
import { addPaginateContact } from "../../views/Contacts/Contacts.slice";

export function listGroups() {
  return async (dispatch: RootDispatch) => {
    const groups = await groupApi.list();
    if (groups) {
      dispatch(replaceGroups(groups));
    }
  };
}

export function createContact() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { form: data } = getState().contactCreate;
    const contact = await contactApi.create(data);
    if (contact) {
      dispatch(addPaginateContact(contact));
      dispatch(resetState());
      dispatch(resetModalActive());
    }
  };
}

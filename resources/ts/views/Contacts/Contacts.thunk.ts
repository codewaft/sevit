import { GetStateFunc, RootDispatch } from "../../store/store";
import downloadService from "../../services/download.service";
import contactApi from "../../apis/contact.api";
import { removePaginateContact, replacePaginate } from "./Contacts.slice";
import { Confirm, removeConfirm, replaceConfirm } from "../../components/Confirm/Confirm.slice";
import { selectContact } from "./Contacts.select";

export function paginateContacts(url?: string) {
  return async (dispatch: RootDispatch) => {
    const paginate = await contactApi.paginate(url);
    dispatch(replacePaginate(paginate));
  };
}

export function deleteContactConfirm() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { confirm } = getState().confirm;
    if (confirm) {
      const contact = await contactApi.delete(confirm.id);
      if (contact) {
        dispatch(removePaginateContact(confirm.id));
        dispatch(removeConfirm());
      }
    }
  };
}

export function deleteContactPrompt(id: number) {
  return (dispatch: RootDispatch, getState: GetStateFunc) => {
    const contact = selectContact(getState(), id);
    if (contact) {
      const confirm: Confirm = {
        id,
        action: "contactDelete",
        type: "warning",
        message: `Are you sure to delete ${contact.phone} contact?`,
      };
      dispatch(replaceConfirm(confirm));
    }
  };
}

export function exportContacts() {
  return async () => {
    const contacts = await contactApi.export();
    if (contacts) {
      downloadService.download(contacts, "contacts.csv");
    }
  };
}

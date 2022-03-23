import contactApi from "../../apis/contact.api";
import { GetStateFunc, RootDispatch } from "../../store/store";
import { resetState } from "./ContactsImport.slice";
import { resetActive as resetModalActive } from "../Modals/Modals.slice";
import { Alert, replaceAlert } from "../Alert/Alert.slice";

export function importContacts() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const file = getState().contactsImport.contacts;
    const data = { contacts: file };
    const contacts = await contactApi.import(data);
    if (contacts) {
      const processAlert: Alert = { type: "info", message: "Contacts import being processed" };
      dispatch(replaceAlert(processAlert));
      dispatch(resetState());
      dispatch(resetModalActive());
    }
  };
}

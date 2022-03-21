import { RootDispatch } from "../../store/store";
import { replacePaginate } from "./Contacts.slice";
import contactApi from "../../apis/contact.api";

export function paginateContacts(url?: string) {
  return async (dispatch: RootDispatch) => {
    const paginate = await contactApi.paginate(url);
    dispatch(replacePaginate(paginate));
  };
}

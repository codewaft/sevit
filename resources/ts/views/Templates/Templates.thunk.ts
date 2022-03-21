import { RootDispatch } from "../../store/store";
import { replacePaginate } from "./Templates.slice";
import templateApi from "../../apis/template.api";

export function paginateTemplates(url?: string) {
  return async (dispatch: RootDispatch) => {
    const paginate = await templateApi.paginate(url);
    dispatch(replacePaginate(paginate));
  };
}

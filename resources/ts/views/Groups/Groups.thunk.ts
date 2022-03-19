import groupApi from "../../apis/group.api";
import { RootDispatch } from "../../store/store";
import { replacePaginate } from "./Groups.slice";

export const paginateGroups = (dispatch: RootDispatch) => {
  return async (url?: string) => {
    const paginate = await groupApi.paginate(url);
    dispatch(replacePaginate(paginate));
  };
};

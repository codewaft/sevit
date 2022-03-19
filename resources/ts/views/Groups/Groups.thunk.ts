import groupApi from "../../apis/group.api";
import { RootDispatch } from "../../store";
import { replacePaginate } from "./Groups.slice";

export const paginateGroups = async (dispatch: RootDispatch) => {
  const paginate = await groupApi.paginate();
  dispatch(replacePaginate(paginate));
};

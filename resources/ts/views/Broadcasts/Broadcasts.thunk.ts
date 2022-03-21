import { RootDispatch } from "../../store/store";
import { replacePaginate } from "./Broadcasts.slice";
import broadcastApi from "../../apis/broadcast.api";

export function paginateBroadcasts(url?: string) {
  return async (dispatch: RootDispatch) => {
    const paginate = await broadcastApi.paginate(url);
    dispatch(replacePaginate(paginate));
  };
}

import { GetStateFunc, RootDispatch } from "../../store/store";
import broadcastApi from "../../apis/broadcast.api";
import { replaceBroadcast, replaceMessagePaginate } from "./BroadcastMessages.slice";

export function paginateBroadcastMessages(url?: string) {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { id } = getState().broadcastMessages;
    if (id) {
      const paginate = await broadcastApi.paginateMessages(url, id);
      dispatch(replaceMessagePaginate(paginate));
    } else {
      const paginate = await broadcastApi.paginateMessages(url);
      dispatch(replaceMessagePaginate(paginate));
    }
  };
}

export function readBroadcast() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { id } = getState().broadcastMessages;
    if (id) {
      const broadcast = await broadcastApi.read(id);
      if (broadcast) {
        dispatch(replaceBroadcast(broadcast));
      }
    }
  };
}

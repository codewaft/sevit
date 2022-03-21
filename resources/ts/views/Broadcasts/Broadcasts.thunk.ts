import { GetStateFunc, RootDispatch } from "../../store/store";
import broadcastApi from "../../apis/broadcast.api";
import { removePaginateBroadcast, replacePaginate } from "./Broadcasts.slice";
import { Confirm, removeConfirm, replaceConfirm } from "../../components/Confirm/Confirm.slice";
import { selectBroadcast } from "./Broadcasts.selector";

export function paginateBroadcasts(url?: string) {
  return async (dispatch: RootDispatch) => {
    const paginate = await broadcastApi.paginate(url);
    dispatch(replacePaginate(paginate));
  };
}

export function deleteBroadcastConfirm() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { confirm } = getState().confirm;
    if (confirm) {
      const broadcast = await broadcastApi.delete(confirm.id);
      if (broadcast) {
        dispatch(removePaginateBroadcast(confirm.id));
        dispatch(removeConfirm());
      }
    }
  };
}

export function deleteBroadcastPrompt(id: number) {
  return (dispatch: RootDispatch, getState: GetStateFunc) => {
    const broadcast = selectBroadcast(getState(), id);
    if (broadcast) {
      const confirm: Confirm = {
        id,
        action: "broadcastDelete",
        type: "warning",
        message: `Are you sure to delete ${broadcast.title} broadcast?`,
      };
      dispatch(replaceConfirm(confirm));
    }
  };
}

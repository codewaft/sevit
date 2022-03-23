import { GetStateFunc, RootDispatch } from "../../store/store";
import broadcastApi from "../../apis/broadcast.api";
import { replaceBroadcast } from "./BroadcastMessages.slice";

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

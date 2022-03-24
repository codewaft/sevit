import { GetStateFunc, RootDispatch } from "../../store/store";
import broadcastApi from "../../apis/broadcast.api";
import groupApi from "../../apis/group.api";
import templateApi from "../../apis/template.api";
import { addPaginateBroadcast } from "../../views/Broadcasts/Broadcasts.slice";
import { resetActive as resetModalActive } from "../Modals/Modals.slice";
import { replaceGroups, replaceTemplates, resetState } from "./BroadcastCreate.slice";

export function listTemplates() {
  return async (dispatch: RootDispatch) => {
    const templates = await templateApi.list();
    if (templates) {
      dispatch(replaceTemplates(templates));
    }
  };
}

export function listGroups() {
  return async (dispatch: RootDispatch) => {
    const groups = await groupApi.list();
    if (groups) {
      dispatch(replaceGroups(groups));
    }
  };
}

export function createBroadcast() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { form: data } = getState().broadcastCreate;
    const broadcast = await broadcastApi.create(data);
    if (broadcast) {
      dispatch(addPaginateBroadcast(broadcast));
      dispatch(resetState());
      dispatch(resetModalActive());
    }
  };
}

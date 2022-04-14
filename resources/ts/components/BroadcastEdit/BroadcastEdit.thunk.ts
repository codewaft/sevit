import { isEmpty, map } from "lodash";
import { GetStateFunc, RootDispatch } from "../../store/store";
import broadcastApi, { EditRequest } from "../../apis/broadcast.api";
import groupApi from "../../apis/group.api";
import templateApi from "../../apis/template.api";
import { updatePaginateBroadcast } from "../../views/Broadcasts/Broadcasts.slice";
import { resetActive as resetModalActive } from "../Modals/Modals.slice";
import { replaceForm, replaceGroups, replaceTemplates, resetState } from "./BroadcastEdit.slice";

export function readBroadcast() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { id } = getState().broadcastEdit;
    if (id) {
      const broadcast = await broadcastApi.read(id);
      if (broadcast) {
        const groupIds = map(broadcast.groups, (group) => group.id);
        const form: EditRequest = {
          title: broadcast.title,
          template: String(broadcast.template.id),
          target: isEmpty(broadcast.groups) ? "all" : "groups",
          groups: groupIds,
          schedule: broadcast.scheduled_at,
        };
        dispatch(replaceForm(form));
      }
    }
  };
}

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

export function updateBroadcast() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { id, form: data } = getState().broadcastEdit;
    if (id) {
      const broadcast = await broadcastApi.edit(id, data);
      if (broadcast) {
        dispatch(updatePaginateBroadcast(broadcast));
        dispatch(resetState());
        dispatch(resetModalActive());
      }
    }
  };
}

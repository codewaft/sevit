import { GetStateFunc, RootDispatch } from "../../store/store";
import { removePaginateTemplate, replacePaginate } from "./Templates.slice";
import templateApi from "../../apis/template.api";
import { Confirm, removeConfirm, replaceConfirm } from "../../components/Confirm/Confirm.slice";
import { selectTemplate } from "./Templates.select";

export function paginateTemplates(url?: string) {
  return async (dispatch: RootDispatch) => {
    const paginate = await templateApi.paginate(url);
    dispatch(replacePaginate(paginate));
  };
}

export function deleteTemplateConfirm() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { confirm } = getState().confirm;
    if (confirm) {
      const template = await templateApi.delete(confirm.id);
      if (template) {
        dispatch(removePaginateTemplate(confirm.id));
        dispatch(removeConfirm());
      }
    }
  };
}

export function deleteTemplatePrompt(id: number) {
  return (dispatch: RootDispatch, getState: GetStateFunc) => {
    const template = selectTemplate(getState(), id);
    if (template) {
      const confirm: Confirm = {
        id,
        action: "templateDelete",
        type: "warning",
        message: `Are you sure to delete ${template.title} template?`,
      };
      dispatch(replaceConfirm(confirm));
    }
  };
}

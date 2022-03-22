import templateApi from "../../apis/template.api";
import { GetStateFunc, RootDispatch } from "../../store/store";
import { updatePaginateTemplate } from "../../views/Templates/Templates.slice";
import { resetActive as resetModalActive } from "../Modals/Modals.slice";
import { Form, replaceForm } from "./TemplateEdit.slice";

export function readTemplate() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { id } = getState().templateEdit;
    if (id) {
      const template = await templateApi.read(id);
      if (template) {
        const form: Form = { title: template.title, content: template.content };
        dispatch(replaceForm(form));
      }
    }
  };
}

export function editTemplate() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { id, form: data } = getState().templateEdit;
    if (id) {
      const template = await templateApi.edit(id, data);
      if (template) {
        dispatch(updatePaginateTemplate(template));
        dispatch(resetModalActive());
      }
    }
  };
}

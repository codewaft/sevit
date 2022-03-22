import { GetStateFunc, RootDispatch } from "../../store/store";
import templateApi from "../../apis/template.api";
import { addPaginateTemplate } from "../../views/Templates/Templates.slice";
import { resetActive as resetModalActive } from "../Modals/Modals.slice";
import { clearForm } from "./TemplateCreate.slice";

export function createTemplate() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { form: data } = getState().templateCreate;
    const template = await templateApi.create(data);
    if (template) {
      dispatch(addPaginateTemplate(template));
      dispatch(clearForm());
      dispatch(resetModalActive());
    }
  };
}

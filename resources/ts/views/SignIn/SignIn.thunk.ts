import userApi from "../../apis/user.api";
import { GetStateFunc, RootDispatch } from "../../store/store";
import routes from "../../routes";
import autoNavigateService from "../../services/autoNavigate.service";
import storageService from "../../services/storage.service";

export function signIn() {
  return async (dispatch: RootDispatch, getState: GetStateFunc) => {
    const { form: data } = getState().signIn;
    const response = await userApi.signIn(data);
    if (response) {
      storageService.set("authToken", response.token);
      autoNavigateService.push(routes.broadcasts);
    }
  };
}

import routes from "../../routes";
import storageService from "../../services/storage.service";
import userApi from "../../apis/user.api";
import store from "../../store/store";
import { replaceRoute } from "../AutoNavigate/AutoNavigate.slice";
import { removeConfirm } from "../Confirm/Confirm.slice";

export function signOut() {
  return async () => {
    const isSignedOut = await userApi.signOut();
    if (isSignedOut) {
      storageService.remove("authToken");
      store.dispatch(replaceRoute(routes.signIn));
      store.dispatch(removeConfirm());
    }
  };
}

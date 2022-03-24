import routes from "../../routes";
import storageService from "../../services/storage.service";
import autoNavigateService from "../../services/autoNavigate.service";
import userApi from "../../apis/user.api";

export function signOut() {
  return async () => {
    const isSignedOut = await userApi.signOut();
    if (isSignedOut) {
      storageService.remove("authToken");
      autoNavigateService.push(routes.signIn);
    }
  };
}

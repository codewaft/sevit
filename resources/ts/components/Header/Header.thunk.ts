import { RootDispatch } from "../../store/store";
import userApi from "../../apis/user.api";
import { replaceUser } from "./Header.slice";

export function readUser() {
  return async (dispatch: RootDispatch) => {
    const user = await userApi.read();
    if (user) {
      dispatch(replaceUser(user));
    }
  };
}

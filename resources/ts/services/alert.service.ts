import store from "../store";
import { replaceAlert, removeAlert } from "../components/Alert/Alert.slice";
import { Type } from "../components/Alert/Alert";

function push(type: Type, message: string) {
  const alert = { type, message };
  store.dispatch(replaceAlert(alert));
}

export default {
  info(message: string) {
    push("info", message);
  },

  success(message: string) {
    push("success", message);
  },

  warning(message: string) {
    push("warning", message);
  },

  error(message: string) {
    push("error", message);
  },

  clear() {
    store.dispatch(removeAlert());
  },
};

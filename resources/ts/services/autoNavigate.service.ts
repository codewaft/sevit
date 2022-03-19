import store from "../store/store";
import { replaceRoute } from "../components/AutoNavigate/AutoNavigate.slice";

export default {
  push(route: string) {
    store.dispatch(replaceRoute(route));
  },
};

import store from "../store/store";
import { replaceRoute } from "../components/AutoNavigate/AutoNavigate.slice";
import { resetActive as resetActiveModal } from "../components/Modals/Modals.slice";

export default {
  clear() {
    store.dispatch(resetActiveModal());
  },
};

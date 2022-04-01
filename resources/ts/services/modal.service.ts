import store from "../store/store";
import { resetActive as resetActiveModal } from "../components/Modals/Modals.slice";

export default {
  clear() {
    store.dispatch(resetActiveModal());
  },
};

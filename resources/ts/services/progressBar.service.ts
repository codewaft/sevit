import store from "../store/store";
import { startProgress, stopProgress } from "../components/ProgressBar/ProgressBar.slice";

export default {
  start() {
    store.dispatch(startProgress());
  },

  stop() {
    store.dispatch(stopProgress());
  },
};

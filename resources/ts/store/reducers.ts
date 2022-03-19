import groupsReducer from "../views/Groups/Groups.slice";
import alertReducer from "../components/Alert/Alert.slice";
import progressBarReducer from "../components/ProgressBar/ProgressBar.slice";

export default {
  groups: groupsReducer,
  alert: alertReducer,
  progressBar: progressBarReducer,
};

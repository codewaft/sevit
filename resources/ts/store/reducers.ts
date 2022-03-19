import groupsReducer from "../views/Groups/Groups.slice";
import alertReducer from "../components/Alert/Alert.slice";
import progressBarReducer from "../components/ProgressBar/ProgressBar.slice";
import autoNavigateReducer from "../components/AutoNavigate/AutoNavigate.slice";
import modalsReducer from "../components/Modals/Modals.slice";

export default {
  groups: groupsReducer,
  alert: alertReducer,
  progressBar: progressBarReducer,
  autoNavigate: autoNavigateReducer,
  modals: modalsReducer,
};

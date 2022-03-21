import groupsReducer from "../views/Groups/Groups.slice";
import contactsReducer from "../views/Contacts/Contacts.slice";
import alertReducer from "../components/Alert/Alert.slice";
import progressBarReducer from "../components/ProgressBar/ProgressBar.slice";
import autoNavigateReducer from "../components/AutoNavigate/AutoNavigate.slice";
import modalsReducer from "../components/Modals/Modals.slice";
import confirmReducer from "../components/Confirm/Confirm.slice";
import groupCreateReducer from "../components/GroupCreate/GroupCreate.slice";

export default {
  groups: groupsReducer,
  contacts: contactsReducer,
  alert: alertReducer,
  progressBar: progressBarReducer,
  autoNavigate: autoNavigateReducer,
  modals: modalsReducer,
  confirm: confirmReducer,
  groupCreate: groupCreateReducer,
};

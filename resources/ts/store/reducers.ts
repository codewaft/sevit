import signInReducer from "../views/SignIn/SignIn.slice";
import headerReducer from "../components/Header/Header.slice";
import groupsReducer from "../views/Groups/Groups.slice";
import contactsReducer from "../views/Contacts/Contacts.slice";
import templatesReducer from "../views/Templates/Templates.slice";
import broadcastsReducer from "../views/Broadcasts/Broadcasts.slice";
import broadcastReducer from "../components/Broadcast/Broadcast.slice";
import broadcastMessagesReducer from "../components/BroadcastMessages/BroadcastMessages.slice";
import alertReducer from "../components/Alert/Alert.slice";
import progressBarReducer from "../components/ProgressBar/ProgressBar.slice";
import autoNavigateReducer from "../components/AutoNavigate/AutoNavigate.slice";
import modalsReducer from "../components/Modals/Modals.slice";
import confirmReducer from "../components/Confirm/Confirm.slice";
import templateCreateReducer from "../components/TemplateCreate/TemplateCreate.slice";
import templateEditReducer from "../components/TemplateEdit/TemplateEdit.slice";
import groupCreateReducer from "../components/GroupCreate/GroupCreate.slice";
import groupEditReducer from "../components/GroupEdit/GroupEdit.slice";
import contactCreateReducer from "../components/ContactCreate/ContactCreate.slice";
import contactEditReducer from "../components/ContactEdit/ContactEdit.slice";
import contactsImportReducer from "../components/ContactsImport/ContactsImport.slice";
import broadcastCreateReducer from "../components/BroadcastCreate/BroadcastCreate.slice";
import broadcastEditReducer from "../components/BroadcastEdit/BroadcastEdit.slice";

export default {
  signIn: signInReducer,
  header: headerReducer,
  groups: groupsReducer,
  contacts: contactsReducer,
  templates: templatesReducer,
  broadcasts: broadcastsReducer,
  broadcast: broadcastReducer,
  broadcastMessages: broadcastMessagesReducer,
  alert: alertReducer,
  progressBar: progressBarReducer,
  autoNavigate: autoNavigateReducer,
  modals: modalsReducer,
  confirm: confirmReducer,
  templateCreate: templateCreateReducer,
  templateEdit: templateEditReducer,
  groupCreate: groupCreateReducer,
  groupEdit: groupEditReducer,
  contactCreate: contactCreateReducer,
  contactEdit: contactEditReducer,
  contactsImport: contactsImportReducer,
  broadcastCreate: broadcastCreateReducer,
  broadcastEdit: broadcastEditReducer,
};

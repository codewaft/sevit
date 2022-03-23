import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/store";
import { ModalName } from "./Modals.slice";
import Modal from "../Modal";
import BroadcastCreate from "../BroadcastCreate";
import Broadcast from "../Broadcast/Broadcast";
import BroadcastEdit from "../BroadcastEdit";
import BroadcastMessages from "../BroadcastMessages/BroadcastMessages";
import TemplateCreate from "../TemplateCreate/TemplateCreate";
import TemplateEdit from "../TemplateEdit/TemplateEdit";
import ContactCreate from "../ContactCreate/ContactCreate";
import ContactEdit from "../ContactEdit/ContactEdit";
import GroupCreate from "../GroupCreate/GroupCreate";
import GroupEdit from "../GroupEdit/GroupEdit";
import ContactsImport from "../ContactsImport/ContactsImport";

interface Props extends StateProps, DispatchProps {}

class Modals extends PureComponent<Props> {
  get activeModal(): ModalName {
    return "groupEdit";
  }

  modal() {
    switch (this.props.active) {
      case "broadcastCreate":
        return (
          <Modal size="full" heading="Create broadcast">
            <BroadcastCreate />
          </Modal>
        );
      case "broadcast":
        return (
          <Modal size="half">
            <Broadcast />
          </Modal>
        );
      case "broadcastMessages":
        return (
          <Modal size="full">
            <BroadcastMessages />
          </Modal>
        );
      case "broadcastEdit":
        return (
          <Modal size="full" heading="Edit broadcast">
            <BroadcastEdit />
          </Modal>
        );
      case "templateCreate":
        return (
          <Modal size="full" heading="Create template">
            <TemplateCreate />
          </Modal>
        );
      case "templateEdit":
        return (
          <Modal size="full" heading="Edit template">
            <TemplateEdit />
          </Modal>
        );
      case "contactCreate":
        return (
          <Modal size="half" heading="Create contact">
            <ContactCreate />
          </Modal>
        );
      case "contactEdit":
        return (
          <Modal size="half" heading="Edit contact">
            <ContactEdit />
          </Modal>
        );
      case "groupCreate":
        return (
          <Modal size="half" heading="Create group">
            <GroupCreate />
          </Modal>
        );
      case "groupEdit":
        return (
          <Modal size="half" heading="Edit group">
            <GroupEdit />
          </Modal>
        );
      case "contactsImport":
        return (
          <Modal size="half" heading="Import contacts">
            <ContactsImport />
          </Modal>
        );
      default:
        return null;
    }
  }

  render() {
    return this.modal();
  }
}

const mapStateToProps = (state: RootState) => ({
  active: state.modals.active,
});

const mapDispatchToProps = () => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Modals);

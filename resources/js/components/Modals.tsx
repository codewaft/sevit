import React, { PureComponent } from "react";
import Modal from "./Modal";
import BroadcastCreate from "./BroadcastCreate";
import Broadcast from "./Broadcast";
import BroadcastEdit from "./BroadcastEdit";
import BroadcastMessages from "./BroadcastMessages";
import TemplateCreate from "./TemplateCreate";
import TemplateEdit from "./TemplateEdit";
import ContactCreate from "./ContactCreate";
import ContactEdit from "./ContactEdit";
import GroupCreate from "./GroupCreate";
import GroupEdit from "./GroupEdit";

type ModalName =
  | "broadcastCreate"
  | "broadcast"
  | "broadcastmessages"
  | "broadcastEdit"
  | "teimplateCreate"
  | "teimplateEdit"
  | "contactCreate"
  | "contactEdit"
  | "groupCreate"
  | "groupEdit";

export default class Modals extends PureComponent {
  get activeModal(): ModalName {
    return "groupEdit";
  }

  modal() {
    const activeModal = this.activeModal;
    switch (activeModal) {
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
      case "broadcastmessages":
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
      case "teimplateCreate":
        return (
          <Modal size="full" heading="Create template">
            <TemplateCreate />
          </Modal>
        );
      case "teimplateEdit":
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
    }
  }

  render() {
    return this.modal();
  }
}

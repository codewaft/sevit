import React, { PureComponent } from "react";
import Modal from "./Modal";
import BroadcastCreate from "./BroadcastCreate";
import Broadcast from "./Broadcast";

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
    return "broadcast";
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
    }
  }

  render() {
    return this.modal();
  }
}

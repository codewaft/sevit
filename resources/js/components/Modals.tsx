import React, { PureComponent } from "react";
import Modal from "./Modal";
import BroadcastCreate from "./BroadcastCreate";

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
    return "broadcastCreate";
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
    }
  }

  render() {
    return this.modal();
  }
}

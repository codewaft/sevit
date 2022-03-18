import React, { PureComponent } from "react";
import Alert, { Type as AlertType } from "./Alert/Alert";

interface Props {
  type: AlertType;
}

export default class Confirm extends PureComponent<Props> {
  handleConfirm() {}

  handleCancel() {}

  render() {
    return (
      <Alert type={this.props.type}>
        <div className="flex gap-4 items-center">
          {this.props.children}
          <div
            className="text-red-500 uppercase text-sm font-medium"
            onClick={this.handleConfirm}
          >
            Yes
          </div>
          <div
            className="text-slate-900 uppercase text-sm font-medium"
            onClick={this.handleConfirm}
          >
            Cancel
          </div>
        </div>
      </Alert>
    );
  }
}

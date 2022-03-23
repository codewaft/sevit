import React, { PureComponent } from "react";
import { join } from "lodash";
import { MessageStatus, Status as BroadcastStatus } from "../apis/broadcast.api";
import Label, { Type as LabelType } from "./Label";

type Name = BroadcastStatus | MessageStatus;
type LabelTypes = Record<Name, LabelType>;

interface Props {
  name: Name;
  append?: string;
}

export default class Status extends PureComponent<Props> {
  labelTypes: LabelTypes = {
    scheduled: "warning",
    processing: "primary",
    completed: "success",
    processed: "success",
    failed: "danger",
  };

  get text() {
    const { name, append } = this.props;
    return join([name, append], " ");
  }

  render() {
    return <Label type={this.labelTypes[this.props.name]} text={this.text} />;
  }
}

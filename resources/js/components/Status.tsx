import React, { PureComponent } from "react";
import Label, { Type as LabelType } from "./Label";

type Name = "scheduled" | "processing" | "completed" | "processed" | "failed";
type LabelTypes = Record<Name, LabelType>;

interface Props {
  name: Name;
}

export default class Status extends PureComponent<Props> {
  labelTypes: LabelTypes = {
    scheduled: "warning",
    processing: "primary",
    completed: "success",
    processed: "success",
    failed: "danger",
  };

  render() {
    return (
      <Label type={this.labelTypes[this.props.name]} text={this.props.name} />
    );
  }
}

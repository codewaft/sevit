import React, { Component } from "react";
import { isEmpty } from "lodash";
import { Option as SelectOption } from "./Select";
import Label from "./Label";

interface Props {
  selectedOptions: SelectOption[];
  onRemove: (value: string) => void;
}

export default class MultiSelectedLabels extends Component<Props> {
  label(option: SelectOption) {
    const { name, value } = option;
    return (
      <Label type="secondary" text={name} onClose={() => this.props.onRemove(value)} key={value} />
    );
  }

  get labels() {
    return this.props.selectedOptions.map((option) => this.label(option));
  }

  render() {
    const { selectedOptions } = this.props;
    return (
      !isEmpty(selectedOptions) && <div className="flex flex-wrap gap-2.5 mb-3">{this.labels}</div>
    );
  }
}

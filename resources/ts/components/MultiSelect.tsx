import React, { Component } from "react";
import { find, findIndex, reject, map } from "lodash";
import Select, { Option as SelectOption } from "./Select";
import MultiSelectedLabels from "./MultiSelectedLabels";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  selectedOptions: SelectOption[];
  onChange: (name: string, selectedOptions: SelectOption[]) => void;
}

interface State {
  value: string;
}

export default class MultiSelect extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleRemoveClick(value: string) {
    const selectedOptions = reject(this.props.selectedOptions, { value });
    this.props.onChange(this.props.name, selectedOptions);
  }

  handleSelectChange(name: string, value: string) {
    const option = find(this.props.options, { value });
    if (option) {
      const isSelected = findIndex(this.props.selectedOptions, { value }) !== -1;
      if (!isSelected) {
        const selectedOptions = this.props.selectedOptions;
        selectedOptions.push(option);
        this.props.onChange(this.props.name, selectedOptions);
      }
    }
  }

  render() {
    return (
      <Select
        options={this.props.options}
        name={this.props.name}
        label={this.props.label}
        value={this.state.value}
        placeholder={this.props.placeholder}
        onChange={this.handleSelectChange}
      >
        <MultiSelectedLabels
          selectedOptions={this.props.selectedOptions}
          onRemove={this.handleRemoveClick}
        />
      </Select>
    );
  }
}

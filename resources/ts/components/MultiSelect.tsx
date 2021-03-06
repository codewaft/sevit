import React, { Component } from "react";
import { find, findIndex, reject } from "lodash";
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
    const { name, onChange } = this.props;
    const selectedOptions = reject(this.props.selectedOptions, { value });
    onChange(name, selectedOptions);
  }

  handleSelectChange(selectName: string, value: string) {
    const { options, selectedOptions, onChange, name } = this.props;
    const option = find(options, { value });
    if (option) {
      const isSelected = findIndex(selectedOptions, { value }) !== -1;
      if (!isSelected) {
        selectedOptions.push(option);
        onChange(name, selectedOptions);
      }
    }
  }

  render() {
    const { options, name, label, placeholder, selectedOptions } = this.props;
    return (
      <Select
        options={options}
        name={name}
        label={label}
        value={this.state.value}
        placeholder={placeholder}
        onChange={this.handleSelectChange}
      >
        <MultiSelectedLabels selectedOptions={selectedOptions} onRemove={this.handleRemoveClick} />
      </Select>
    );
  }
}

import React, { Component } from "react";
import { find, findIndex, reject, map } from "lodash";
import Select, { Option as SelectOption } from "./Select";
import MultiSelectedLabels from "./MultiSelectedLabels";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (name: string, selectedVales: string[]) => void;
}

interface State {
  value: string;
  selectedOptions: SelectOption[];
}

export default class MultiSelect extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      value: "",
      selectedOptions: [],
    };
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleRemoveClick = this.handleRemoveClick.bind(this);
  }

  handleChange(selectedOptions: SelectOption[]) {
    const selectedValues = map(selectedOptions, (option) => option.value);
    this.props.onChange(this.props.name, selectedValues);
  }

  handleRemoveClick(value: string) {
    const selectedOptions = reject(this.state.selectedOptions, { value });
    this.handleChange(selectedOptions);
    this.setState({ selectedOptions });
  }

  handleSelectChange(name: string, value: string) {
    const option = find(this.props.options, { value });
    if (option) {
      const isSelected = findIndex(this.state.selectedOptions, { value }) !== -1;
      if (!isSelected) {
        const selectedOptions = this.state.selectedOptions;
        selectedOptions.push(option);
        this.handleChange(selectedOptions);
        this.setState({ selectedOptions });
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
          selectedOptions={this.state.selectedOptions}
          onRemove={this.handleRemoveClick}
        />
      </Select>
    );
  }
}

import React, { Component } from "react";
import { find, findIndex, isEmpty, reject } from "lodash";
import Select, { Option as SelectOption } from "./Select";
import Label from "./Label";

interface Props {
  name: string;
  label: string;
  placeholder: string;
  options: SelectOption[];
  onChange: (options: SelectOption[]) => void;
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
    this.handleOptionRemoveClick = this.handleOptionRemoveClick.bind(this);
  }

  handleOptionRemoveClick(option: SelectOption) {
    this.setState((state: State) => {
      const selectedOptions = reject(state.selectedOptions, option);
      this.props.onChange(selectedOptions);
      return { selectedOptions };
    });
  }

  selectedOption(option: SelectOption) {
    return (
      <Label
        type="secondary"
        text={option.name}
        onClose={() => this.handleOptionRemoveClick(option)}
        key={option.name}
      />
    );
  }

  get selectedOptions() {
    const { selectedOptions } = this.state;
    return (
      !isEmpty(selectedOptions) && (
        <div className="flex flex-wrap gap-2.5 mb-3">
          {selectedOptions.map((option) => this.selectedOption(option))}
        </div>
      )
    );
  }

  pushOption(option: SelectOption) {
    const isExisting =
      findIndex(this.state.selectedOptions, {
        value: option.value,
      }) !== -1;
    if (!isExisting) {
      this.setState((state: State) => {
        const selectedOptions = state.selectedOptions;
        selectedOptions.push(option);
        this.props.onChange(selectedOptions);
        return { selectedOptions };
      });
    }
  }

  handleSelectChange(name: string, value: string) {
    const option = find(this.props.options, { value });
    if (option) this.pushOption(option);
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
        {this.selectedOptions}
      </Select>
    );
  }
}

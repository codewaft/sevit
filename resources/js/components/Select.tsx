import React, { ChangeEvent, PureComponent } from "react";
import FormLabel from "./FormLabel";

export interface Option {
  name: string;
  value: string;
}

interface Props {
  name: string;
  value: string;
  label: string;
  placeholder: string;
  options: Option[];
  onChange: (name: string, value: string) => void;
}

export default class Select extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  get options() {
    return this.props.options.map((option) => this.option(option));
  }

  option(option: Option) {
    return (
      <option value={option.value} key={option.value}>
        {option.name}
      </option>
    );
  }

  handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name } = this.props;
    const { value } = event.target;
    this.props.onChange(name, value);
  }

  render() {
    return (
      <div className="block w-full">
        <FormLabel text={this.props.label} />
        <select
          className="h-12 w-full px-5 text-md rounded-md drop-shadow-md outline-none disabled:text-slate-400 invalid:text-slate-400 text-slate-900 mb-4 border-r-[20px] border-r-transparent"
          name={this.props.name}
          value={this.props.value}
          onChange={this.handleChange}
          required
        >
          <option value="" disabled>
            {this.props.placeholder}
          </option>
          {this.options}
        </select>
      </div>
    );
  }
}

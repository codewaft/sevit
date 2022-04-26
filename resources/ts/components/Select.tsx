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
    const { name, value } = option;
    return (
      <option value={value} key={value}>
        {name}
      </option>
    );
  }

  handleChange(event: ChangeEvent<HTMLSelectElement>) {
    const { name } = this.props;
    const { value } = event.target;
    this.props.onChange(name, value);
  }

  render() {
    const { label, children, name, value, placeholder } = this.props;
    return (
      <div className="block w-full">
        <FormLabel text={label} />
        {children}
        <select
          className="h-12 w-full px-5 text-md rounded-md drop-shadow-md outline-none disabled:text-slate-400 invalid:text-slate-400 text-slate-900 mb-4 border-r-[20px] border-r-transparent bg-white"
          name={name}
          value={value}
          onChange={this.handleChange}
          required
        >
          <option value="">{placeholder}</option>
          {this.options}
        </select>
      </div>
    );
  }
}

import React, { ChangeEvent, Component } from "react";
import FormLabel from "./FormLabel";

interface InputProps {
  name: string;
  value: string;
  type: string;
  label: string;
  placeholder: string;
  onChange: (name: string, value: string) => void;
}

export default class Input extends Component<InputProps> {
  constructor(props: InputProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;
    this.props.onChange(name, value);
  }

  render() {
    return (
      <div className="block w-full">
        <FormLabel text={this.props.label} />
        <input
          className="h-12 w-full px-5 text-md rounded-md drop-shadow-md outline-none placeholder:text-slate-400 text-slate-900 mb-4"
          name={this.props.name}
          value={this.props.value}
          type={this.props.type}
          placeholder={this.props.placeholder}
          onInput={this.handleChange}
        />
      </div>
    );
  }
}

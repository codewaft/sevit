import React, { ChangeEvent, PureComponent } from "react";
import FormLabel from "./FormLabel";

interface Props {
  name: string;
  value: string;
  label: string;
  onChange: (name: string, value: string) => void;
}

export default class DateTime extends PureComponent<Props> {
  constructor(props: Props) {
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
          required
          className="h-12 w-full px-5 text-md rounded-md drop-shadow-md outline-none text-slate-900 mb-4disabled:text-slate-400 invalid:text-slate-400 mb-4"
          type="datetime-local"
          name={this.props.name}
          value={this.props.value}
          onInput={this.handleChange}
        />
      </div>
    );
  }
}

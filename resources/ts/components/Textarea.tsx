import React, { ChangeEvent, PureComponent } from "react";
import FormLabel from "./FormLabel";

interface Props {
  name: string;
  value: string;
  label: string;
  placeholder: string;
  rows: number;
  onChange: (name: string, value: string) => void;
}

export default class Textarea extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    this.props.onChange(name, value);
  }

  render() {
    const { label, name, value, placeholder, rows } = this.props;
    return (
      <div className="block w-full">
        <FormLabel text={label} />
        <textarea
          className="py-3.5 w-full px-5 text-md rounded-md drop-shadow-md outline-none placeholder:text-slate-400 text-slate-900 mb-4"
          name={name}
          value={value}
          placeholder={placeholder}
          rows={rows}
          onInput={this.handleChange}
        />
      </div>
    );
  }
}

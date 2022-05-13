import React, { ChangeEvent, PureComponent } from "react";
import FormLabel from "./FormLabel";

interface Props {
  name: string;
  value: string;
  label: string;
  placeholder: string;
  rows: number;
  helper?: JSX.Element;
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

  get helper() {
    const component = this.props.helper || null;
    return <small className="block mb-4 text-slate-500">{component}</small>;
  }

  render() {
    const { label, name, value, placeholder, rows } = this.props;
    return (
      <div className="block w-full">
        <FormLabel text={label} />
        <textarea
          className="pt-3.5 w-full px-5 text-md rounded-md drop-shadow-md outline-none placeholder:text-slate-400 text-slate-900"
          name={name}
          value={value}
          placeholder={placeholder}
          rows={rows}
          onInput={this.handleChange}
        />
        {this.helper}
      </div>
    );
  }
}

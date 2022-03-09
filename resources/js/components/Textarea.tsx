import React, { ChangeEvent, Component } from "react";
import FormLabel from "./FormLabel";

interface TextareaProps {
  name: string;
  value: string;
  label: string;
  placeholder: string;
  rows: number;
  onChange: (name: string, value: string) => void;
}

export default class Textarea extends Component<TextareaProps> {
  constructor(props: TextareaProps) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: ChangeEvent<HTMLTextAreaElement>) {
    const { name, value } = event.target;
    this.props.onChange(name, value);
  }

  render() {
    return (
      <div className="block w-full">
        <FormLabel text={this.props.label} />
        <textarea
          className="py-3.5 w-full px-5 text-md rounded-md drop-shadow-md outline-none placeholder:text-slate-400 text-slate-900 mb-4"
          name={this.props.name}
          value={this.props.value}
          placeholder={this.props.placeholder}
          rows={this.props.rows}
          onInput={this.handleChange}
        />
      </div>
    );
  }
}

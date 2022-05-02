import React, { ChangeEvent, PureComponent } from "react";
import dateUtil from "../utils/date.util";
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

  get local() {
    return dateUtil.local(this.props.value);
  }

  handleChange(event: ChangeEvent<HTMLInputElement>) {
    const { target } = event;
    const value = dateUtil.utc(target.value);
    this.props.onChange(target.name, value);
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
          value={this.local}
          onInput={this.handleChange}
        />
      </div>
    );
  }
}

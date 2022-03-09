import React, { PureComponent } from "react";

interface Props {
  text: string;
}

export default class FormLabel extends PureComponent<Props> {
  render() {
    return (
      <p className="mb-1.5 font-medium text-md text-slate-900">
        {this.props.text}
      </p>
    );
  }
}

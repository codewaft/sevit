import React, { Component } from "react";

interface FormLabelProps {
  text: string;
}

export default class FormLabel extends Component<FormLabelProps> {
  render() {
    return (
      <p className="mb-1.5 font-medium text-md text-slate-900">
        {this.props.text}
      </p>
    );
  }
}

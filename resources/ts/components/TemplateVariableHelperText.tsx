import React, { PureComponent } from "react";

export default class TemplateVariableHelperText extends PureComponent {
  render() {
    return (
      <span>
        Use template variable
        <span className="bg-yellow-100 px-1 mx-1 inline-block rounded-lg">{`{contact}`}</span>
        to add contact's name.
      </span>
    );
  }
}

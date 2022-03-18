import React, { PureComponent } from "react";

export default class TableData extends PureComponent {
  render() {
    return (
      <td className="px-1 first:pl-8 last:pr-8 py-3">{this.props.children}</td>
    );
  }
}

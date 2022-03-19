import React, { PureComponent } from "react";

interface Props {
  truncate?: boolean;
}

export default class TableData extends PureComponent<Props> {
  get className() {
    const base = "truncate overflow-hidden inline-block m-0";
    const width = this.props.truncate && "w-72";
    return `${base} ${width}`;
  }

  render() {
    return (
      <td className="px-1 first:pl-8 last:pr-8 py-3">
        <p className={this.className}>{this.props.children}</p>
      </td>
    );
  }
}

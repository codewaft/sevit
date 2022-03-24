import React, { PureComponent } from "react";

type Truncate = "small" | "medium" | "large";
type TruncateClasses = Record<Truncate, string>;

interface Props {
  truncate?: Truncate;
}

export default class TableData extends PureComponent<Props> {
  truncateClasses: TruncateClasses = {
    small: "w-40",
    medium: "w-52",
    large: "w-80",
  };

  get className() {
    const { truncate } = this.props;
    const base = "truncate overflow-hidden inline-block m-0";
    const width = truncate && this.truncateClasses[truncate];
    return `${base} ${width}`;
  }

  render() {
    return (
      <td className="px-1 first:pl-8 last:pr-8 py-3">
        <div className={this.className}>{this.props.children}</div>
      </td>
    );
  }
}

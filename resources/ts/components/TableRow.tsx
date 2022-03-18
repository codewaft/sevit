import React, { PureComponent } from "react";

export default class TableRow extends PureComponent {
  render() {
    return <tr className="border-t border-slate-200">{this.props.children}</tr>;
  }
}

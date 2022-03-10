import React, { PureComponent } from "react";

interface Props {
  className?: string;
}

export default class Card extends PureComponent<Props> {
  get className() {
    const base = "rounded-xl bg-slate-50 drop-shadow-lg";
    return `${base} ${this.props.className}`;
  }

  render() {
    return <div className={this.className}>{this.props.children}</div>;
  }
}

import React, { PureComponent } from "react";
type Color = "white" | "gray";
type ColorClasses = Record<Color, string>;

interface Props {
  color: Color;
  className?: string;
}

export default class Card extends PureComponent<Props> {
  colorClasses: ColorClasses = {
    white: "bg-white",
    gray: "bg-slate-50",
  };

  get className() {
    const base = "rounded-xl drop-shadow-lg";
    const color = this.colorClasses[this.props.color];
    return `${base} ${color} ${this.props.className}`;
  }

  render() {
    return <div className={this.className}>{this.props.children}</div>;
  }
}

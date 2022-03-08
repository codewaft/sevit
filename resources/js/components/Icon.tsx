import React, { Component } from "react";

type Size = "small" | "regular";
type SizeClasses = Record<Size, string>;

interface IconProps {
  size: Size;
  name: string;
  onClick?: () => void;
}

export default class Icon extends Component<IconProps> {
  sizeClasses: SizeClasses = {
    small: "text-lg",
    regular: "text-2xl",
  };

  get className() {
    const cursor = this.props.onClick ? "cursor-pointer" : "";
    return `${this.sizeClasses} ${this.props.name} ${cursor}`;
  }

  render() {
    return <i className={this.className} onClick={this.props.onClick} />;
  }
}

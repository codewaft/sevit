import React, { Component } from "react";

type Size = "small" | "medium";
type SizeClasses = Record<Size, string>;

interface LogoProps {
  size: Size;
}

export default class Logo extends Component<LogoProps> {
  sizeClasses: SizeClasses = {
    small: "h-11",
    medium: "h-12",
  };

  get className() {
    const sizeClass = this.sizeClasses[this.props.size];
    return `object-cover ${sizeClass}`;
  }

  render() {
    return <img className={this.className} src="./logo.png" />;
  }
}

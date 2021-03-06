import React, { PureComponent } from "react";

type Size = "small" | "medium" | "regular" | "large";
type SizeClasses = Record<Size, string>;

interface Props {
  size: Size;
  text: string;
  className?: string;
}

export default class Heading extends PureComponent<Props> {
  sizeClasses: SizeClasses = {
    small: "text-md",
    medium: "text-[21px]",
    regular: "text-[22px]",
    large: "text-2xl",
  };

  get className() {
    const { size, className } = this.props;
    const sizeClass = this.sizeClasses[size];
    return `font-medium text-slate-900 ${sizeClass} ${className}`;
  }

  render() {
    return <h2 className={this.className}>{this.props.text}</h2>;
  }
}

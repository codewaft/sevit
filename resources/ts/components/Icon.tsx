import React, { PureComponent } from "react";

type Size = "small" | "medium" | "regular" | "large";
type SizeClasses = Record<Size, string>;

interface Props {
  size: Size;
  name: string;
  className?: string;
  onClick?: () => void;
}

export default class Icon extends PureComponent<Props> {
  sizeClasses: SizeClasses = {
    small: "text-sm",
    medium: "text-lg",
    regular: "text-2xl",
    large: "text-3xl",
  };

  get className() {
    const { size, name, onClick } = this.props;
    const cursor = onClick ? "cursor-pointer" : "";
    return `${this.props.className} ${this.sizeClasses[size]} ${name} ${cursor}`;
  }

  render() {
    return <i className={this.className} onClick={this.props.onClick} />;
  }
}

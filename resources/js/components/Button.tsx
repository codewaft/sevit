import React, { Component } from "react";
import Icon from "./Icon";

type Size = "small" | "regular";
type SizeClasses = Record<Size, string>;

interface ButtonProps {
  size: Size;
  text: string;
  onClick: () => void;
}

export default class Button extends Component<ButtonProps> {
  sizeClasses: SizeClasses = {
    small: "h-10 px-6 text-slate-900 bg-white",
    regular: "h-12 w-full bg-sky-400 text-white",
  };

  get className() {
    const base =
      "rounded-md drop-shadow-md text-lg flex justify-center items-center gap-3 font-medium";
    return `${base} ${this.sizeClasses[this.props.size]}`;
  }

  render() {
    return (
      <button className={this.className} onClick={this.props.onClick}>
        <Icon size="regular" name="ri-admin-fill" />
        {this.props.text}
      </button>
    );
  }
}

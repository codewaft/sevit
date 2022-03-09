import React, { PureComponent } from "react";
import Icon from "./Icon";

type Type = "primary" | "secondary" | "success" | "warning" | "danger";
type TypeClasses = Record<Type, string>;

interface Props {
  type: Type;
  text: string;
  onClose?: () => void;
}

export default class Label extends PureComponent<Props> {
  typeClasses: TypeClasses = {
    primary: "bg-cyan-300",
    secondary: "bg-yellow-200",
    success: "bg-lime-300",
    warning: "bg-yellow-300",
    danger: "bg-red-200",
  };

  get className() {
    const { type, onClose } = this.props;
    const base =
      "inline-flex items-center gap-1 text-sm text-slate-900 px-3 rounded-md";
    const cursor = onClose ? "cursor-pointer" : "";
    return `${base} ${cursor} ${this.typeClasses[type]}`;
  }

  get close() {
    return this.props.onClose && <Icon size="small" name="ri-close-line" />;
  }

  render() {
    return (
      <div className={this.className} onClick={this.props.onClose}>
        {this.props.text}
        {this.close}
      </div>
    );
  }
}

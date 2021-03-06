import React, { PureComponent } from "react";
import Icon from "./Icon";

export type Type = "info" | "success" | "warning" | "error";
type TypeClasses = Record<Type, string>;

interface Props {
  type: Type;
}

export default class Notify extends PureComponent<Props> {
  typeClasses: TypeClasses = {
    info: "text-cyan-300",
    success: "text-green-500",
    warning: "text-yellow-400",
    error: "text-red-500",
  };

  get className() {
    const { type } = this.props;
    const base =
      "inline-flex items-center py-2 gap-2.5 px-5 rounded-lg drop-shadow-md bg-white absolute mx-auto bottom-10 inset-x-0 w-fit z-20";
    return `${base} ${this.typeClasses[type]}`;
  }

  render() {
    return (
      <div className={this.className}>
        <Icon size="large" name="ri-error-warning-line" />
        <div className="text-md text-slate-600">{this.props.children}</div>
      </div>
    );
  }
}

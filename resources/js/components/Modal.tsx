import React, { PureComponent } from "react";
import Card from "./Card";
import Icon from "./Icon";

type Size = "half" | "full";
type SizeClasses = Record<Size, string>;

interface Props {
  size: Size;
}

export default class Modal extends PureComponent<Props> {
  sizeClasses: SizeClasses = {
    half: "w-1/3",
    full: "w-7/12",
  };

  get className() {
    const sizeClass = this.sizeClasses[this.props.size];
    return `${sizeClass}`;
  }

  handleCloseClick() {}

  render() {
    return (
      <div className="fixed h-screen w-screen z-50 bg-slate-600/[.15]">
        <div className="container flex justify-center items-center h-full">
          <Card color="gray" className={this.className}>
            <div className="flex justify-end px-3 pt-2 -mb-2">
              <Icon
                size="regular"
                name="ri-close-line"
                onClick={this.handleCloseClick}
              />
            </div>
            {this.props.children}
          </Card>
        </div>
      </div>
    );
  }
}

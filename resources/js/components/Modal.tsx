import React, { PureComponent } from "react";
import Card from "./Card";
import Heading from "./Heading";
import Icon from "./Icon";

type Size = "half" | "full";
type SizeClasses = Record<Size, string>;

interface Props {
  size: Size;
  heading: string;
}

export default class Modal extends PureComponent<Props> {
  sizeClasses: SizeClasses = {
    half: "w-1/3",
    full: "w-7/12",
  };

  get className() {
    const sizeClass = this.sizeClasses[this.props.size];
    return `max-h-[calc(100%-2rem)] overflow-y-auto ${sizeClass}`;
  }

  handleCloseClick() {}

  render() {
    return (
      <div className="fixed h-screen w-screen z-50 bg-slate-600/[.15]">
        <div className="container mx-auto flex justify-center items-center h-full">
          <Card color="gray" className={this.className}>
            <div className="flex justify-end px-3 pt-2 -mb-2">
              <Icon
                size="regular"
                name="ri-close-line"
                onClick={this.handleCloseClick}
              />
            </div>
            <div className="px-10 mb-5">
              <Heading size="regular" text={this.props.heading} />
            </div>
            {this.props.children}
          </Card>
        </div>
      </div>
    );
  }
}

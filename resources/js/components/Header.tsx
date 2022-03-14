import React, { PureComponent } from "react";
import { last, split, upperFirst } from "lodash";
import Heading from "./Heading";
import Logo from "./Logo";
import User from "./User";

export default class Header extends PureComponent {
  get heading() {
    const route = last(split(window.location.pathname, "/"));
    return upperFirst(route);
  }

  render() {
    return (
      <div className="drop-shadow-md bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-7 py-2">
            <div className="col-span-3">
              <Logo size="medium" />
            </div>
            <div className="col-span-9 flex justify-between items-center">
              <Heading size="medium" text={this.heading} />
              <User username="johnsmith" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

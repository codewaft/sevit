import React, { PureComponent } from "react";
import Heading from "./Heading";
import User from "./User";

interface Props {
  heading: string;
}

export default class Header extends PureComponent<Props> {
  render() {
    return (
      <div className="flex justify-between items-center">
        <Heading size="medium" text={this.props.heading} />
        <User username="johnsmith" />
      </div>
    );
  }
}

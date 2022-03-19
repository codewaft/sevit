const { DateTime } = require("luxon");
import React, { PureComponent } from "react";

interface Props {
  date: string;
}

export default class Date extends PureComponent<Props> {
  get date() {
    const date = DateTime.fromISO(this.props.date);
    return date.toFormat("DD h:m a");
  }

  render() {
    return <span className="text-base">{this.date}</span>;
  }
}

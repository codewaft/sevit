import React, { PureComponent } from "react";
import dateUtil from "../utils/date.util";

interface Props {
  date: string;
}

export default class Date extends PureComponent<Props> {
  get date() {
    return dateUtil.humanize(this.props.date);
  }

  render() {
    return <span className="text-base">{this.date}</span>;
  }
}

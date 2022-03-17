import React, { PureComponent } from "react";
import Card from "./Card";
import Icon from "./Icon";

interface Props {
  headers: string[];
}

export default class Table extends PureComponent<Props> {
  get details() {
    return `Showing ${29} ${"broadcasts"} out of ${914}`;
  }

  get headers() {
    return this.props.headers.map((header) => (
      <th className="text-left px-1 first:pl-8 last:pr-8 py-3" key={header}>
        {header}
      </th>
    ));
  }

  render() {
    return (
      <div>
        <div className="flex justify-between mb-3 items-end">
          <p className="-mb-1 text-[15px] text-slate-600">{this.details}</p>
          <div className="inline-flex rounded-md bg-white drop-shadow-md">
            <div className="flex items-center justify-center h-10 w-10 cursor-pointer text-slate-600">
              <Icon size="regular" name="ri-arrow-left-s-line" />
            </div>
            <div className="border-r border-slate-200"></div>
            <div className="flex items-center justify-center h-10 w-10 cursor-not-allowed text-slate-400">
              <Icon size="regular" name="ri-arrow-right-s-line" />
            </div>
          </div>
        </div>
        <Card color="white" className="overflow-x-auto">
          <table className="table-auto w-full text-md">
            <thead className="text-slate-900">
              <tr>{this.headers}</tr>
            </thead>
            <tbody className="text-slate-600">{this.props.children}</tbody>
          </table>
        </Card>
      </div>
    );
  }
}

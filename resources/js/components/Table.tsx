import React, { PureComponent } from "react";
import Card from "./Card";
import Icon from "./Icon";

export default class Table extends PureComponent {
  classes = {
    table: "table-auto w-full text-md",
    thead: "text-slate-900",
    th: "text-left px-1 first:pl-8 last:pr-8 py-3",
    tbody: "text-slate-600",
    tr: "border-t border-slate-200",
    td: " px-1 first:pl-8 last:pr-8 py-3",
  };

  get details() {
    return `Showing ${29} ${"broadcasts"} out of ${914}`;
  }

  render() {
    return (
      <div>
        <div className="flex justify-between mb-3 items-end">
          <p className="-mb-1">{this.details}</p>
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
          <table className={this.classes.table}>
            <thead className={this.classes.thead}>
              <tr>
                <th className={this.classes.th}>Title</th>
                <th className={this.classes.th}>Template</th>
                <th className={this.classes.th}>Target</th>
                <th className={this.classes.th}>Schedule</th>
                <th className={this.classes.th}>Status</th>
                <th className={this.classes.th}>Actions</th>
              </tr>
            </thead>
            <tbody className={this.classes.tbody}>
              <tr className={this.classes.tr}>
                <td className={this.classes.td}>Summer offer</td>
                <td className={this.classes.td}>Summer offer 15% off</td>
                <td className={this.classes.td}>all</td>
                <td className={this.classes.td}>Mar, 10 2022 10:38 PM</td>
                <td className={this.classes.td}>Scheduled</td>
                <td className={this.classes.td}>View</td>
              </tr>
              <tr className={this.classes.tr}>
                <td className={this.classes.td}>Summer offer</td>
                <td className={this.classes.td}>Summer offer 15% off</td>
                <td className={this.classes.td}>all</td>
                <td className={this.classes.td}>Mar, 10 2022 10:38 PM</td>
                <td className={this.classes.td}>Scheduled</td>
                <td className={this.classes.td}>View</td>
              </tr>
              <tr className={this.classes.tr}>
                <td className={this.classes.td}>Summer offer</td>
                <td className={this.classes.td}>Summer offer 15% off</td>
                <td className={this.classes.td}>all</td>
                <td className={this.classes.td}>Mar, 10 2022 10:38 PM</td>
                <td className={this.classes.td}>Scheduled</td>
                <td className={this.classes.td}>View</td>
              </tr>
            </tbody>
          </table>
        </Card>
      </div>
    );
  }
}

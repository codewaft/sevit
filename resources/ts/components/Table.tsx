import React, { PureComponent } from "react";
import { isEmpty } from "lodash";
import { PaginateResponse } from "../services/api.service";
import Card from "./Card";
import Icon from "./Icon";

interface Props {
  name: string;
  headers: string[];
  paginate: PaginateResponse<unknown> | null;
  onPaginate: (url: string) => void;
}

export default class Table extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handlePrevClick = this.handlePrevClick.bind(this);
    this.handleNextClick = this.handleNextClick.bind(this);
  }

  paginateButtonClass(url: string | null) {
    const base = "flex items-center justify-center h-10 w-10 ";
    const cursor = url ? "cursor-pointer text-slate-600" : "cursor-not-allowed text-slate-400";
    return `${base} ${cursor}`;
  }

  get details() {
    const { name, paginate } = this.props;
    if (!paginate) return;
    const { total } = paginate;
    const from = paginate.from || 0;
    const to = paginate.to || 0;
    const count = from ? to - from + 1 : 0;
    return (
      <p className="-mb-1 text-[15px] text-slate-600">
        {`Showing ${count} ${name}, from ${from} to ${to} out of ${total}`}
      </p>
    );
  }

  get paginateButtons() {
    const { paginate } = this.props;
    if (!paginate) return;
    const { prev_page_url, next_page_url } = paginate;
    return (
      <div className="inline-flex rounded-md bg-white drop-shadow-md">
        <div className={this.paginateButtonClass(prev_page_url)} onClick={this.handlePrevClick}>
          <Icon size="regular" name="ri-arrow-left-s-line" />
        </div>
        <div className="border-r border-slate-200" />
        <div className={this.paginateButtonClass(next_page_url)} onClick={this.handleNextClick}>
          <Icon size="regular" name="ri-arrow-right-s-line" />
        </div>
      </div>
    );
  }

  get headers() {
    return this.props.headers.map((header) => (
      <th className="text-left px-1 first:pl-8 last:pr-8 py-3" key={header}>
        {header}
      </th>
    ));
  }

  get noResults() {
    const { paginate } = this.props;
    return (
      isEmpty(paginate && paginate.data) && (
        <div className="flex justify-center text-slate-600 border-t border-slate-200 py-3">
          No results found
        </div>
      )
    );
  }

  handlePrevClick() {
    const { paginate } = this.props;
    if (paginate && paginate.prev_page_url) this.props.onPaginate(paginate.prev_page_url);
  }

  handleNextClick() {
    const { paginate } = this.props;
    if (paginate && paginate.next_page_url) this.props.onPaginate(paginate.next_page_url);
  }

  render() {
    return (
      <div>
        <div className="flex justify-between mb-3 items-end">
          {this.details}
          {this.paginateButtons}
        </div>
        <Card color="white" className="overflow-x-auto">
          <table className="table-auto w-full text-md">
            <thead className="text-slate-900">
              <tr>{this.headers}</tr>
            </thead>
            <tbody className="text-slate-600">{this.props.children}</tbody>
          </table>
          {this.noResults}
        </Card>
      </div>
    );
  }
}

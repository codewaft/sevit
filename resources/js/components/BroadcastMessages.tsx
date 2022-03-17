import React, { PureComponent } from "react";
import Label from "./Label";
import Heading from "./Heading";
import Table from "./Table";

interface Props {}

interface State {}

export default class BroadcastMessages extends PureComponent<Props, State> {
  get tableHeaders() {
    return ["ID", "Phone", "Status", "Processed at"];
  }

  readBroadcast() {}

  componentDidMount() {
    this.readBroadcast();
  }

  render() {
    return (
      <div className="px-10 pb-10">
        <div className="flex gap-3 items-center">
          <Heading size="regular" text="Summer offer" />
          <Label type="success" text="completed (185/190)" />
        </div>
        <Table headers={this.tableHeaders}></Table>
      </div>
    );
  }
}

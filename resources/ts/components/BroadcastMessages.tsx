import React, { PureComponent } from "react";
import Label from "./Label";
import Heading from "./Heading";
import Date from "../components/Date";
import Status from "../components/Status";
import Table from "../components/Table";
import TableData from "../components/TableData";
import TableRow from "../components/TableRow";

interface Props {}

interface State {}

export default class BroadcastMessages extends PureComponent<Props, State> {
  get tableHeaders() {
    return ["ID", "Phone", "Status", "Processed at"];
  }

  tableRow(message: any) {
    return (
      <TableRow key={message.id}>
        <TableData>{message.id}</TableData>
        <TableData>{message.phone}</TableData>
        <TableData>
          <Status name={message.status} />
        </TableData>
        <TableData>
          <Date date={message.processedAt} />
        </TableData>
      </TableRow>
    );
  }

  get messages() {
    const messages = [
      {
        id: "hf0343jfdfk",
        phone: "+1 983 8534",
        status: "failed",
        processedAt: "2022-09-12T03:20:34.091-04:00",
      },
    ];
    return messages.map((message) => this.tableRow(message));
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
        <Table name="messages" headers={this.tableHeaders} paginate={null} onPaginate={() => {}}>
          {this.messages}
        </Table>
      </div>
    );
  }
}

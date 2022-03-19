import React, { PureComponent } from "react";
import Actions, { Name as ActionName } from "../components/Actions";
import Button from "../components/Button";
import Date from "../components/Date";
import Status from "../components/Status";
import Table from "../components/Table";
import TableData from "../components/TableData";
import TableRow from "../components/TableRow";

interface Props {}

interface State {}

export default class Broadcasts extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  get tableActions(): ActionName[] {
    return ["view", "messages", "edit", "delete"];
  }

  get tableHeaders() {
    return ["Title", "Template", "Target", "Schedule", "Status", "Actions"];
  }

  tableRow(broadcast: any) {
    return (
      <TableRow key={broadcast.id}>
        <TableData>{broadcast.title}</TableData>
        <TableData>{broadcast.template}</TableData>
        <TableData>{broadcast.target}</TableData>
        <TableData>
          <Date date={broadcast.scheduledAt} />
        </TableData>
        <TableData>
          <Status name={broadcast.status} />
        </TableData>
        <TableData>
          <Actions id={broadcast.id} actions={this.tableActions} onClick={this.handleActionClick} />
        </TableData>
      </TableRow>
    );
  }

  get broadcasts() {
    const broadcasts = [
      {
        id: 1,
        title: "Summer offer",
        template: "Summer offer 15% off",
        target: "all",
        scheduledAt: "2022-09-14T03:20:34.091-04:00",
        status: "scheduled",
      },
    ];
    return broadcasts.map((broadcast) => this.tableRow(broadcast));
  }

  handleActionClick(id: number, action: ActionName) {}

  handleCreateClick() {}

  render() {
    return (
      <div>
        <Button
          size="small"
          text="Create broadcast"
          icon="ri-add-circle-line"
          onClick={this.handleCreateClick}
        />
        <Table name="broadcasts" headers={this.tableHeaders} paginate={null} onPaginate={() => {}}>
          {this.broadcasts}
        </Table>
      </div>
    );
  }
}

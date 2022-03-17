import React, { PureComponent } from "react";
import Actions, { Name as ActionName } from "../components/Actions";
import Button from "../components/Button";
import Date from "../components/Date";
import Table from "../components/Table";
import TableData from "../components/TableData";
import TableRow from "../components/TableRow";

interface Props {}

interface State {}

export default class Groups extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  get tableActions(): ActionName[] {
    return ["edit", "delete"];
  }

  get tableHeaders() {
    return ["Title", "Created at", "Updated at", "Actions"];
  }

  tableRow(group: any) {
    return (
      <TableRow key={group.id}>
        <TableData>{group.title}</TableData>
        <TableData>
          <Date date={group.createdAt} />
        </TableData>
        <TableData>
          <Date date={group.updatedAt} />
        </TableData>
        <TableData>
          <Actions
            id={group.id}
            actions={this.tableActions}
            onClick={this.handleActionClick}
          />
        </TableData>
      </TableRow>
    );
  }

  get groups() {
    const groups = [
      {
        id: 1,
        title: "Summer offer",
        createdAt: "2022-09-13T03:20:34.091-04:00",
        updatedAt: "2022-09-12T03:20:34.091-04:00",
      },
    ];
    return groups.map((group) => this.tableRow(group));
  }

  handleActionClick(id: number, action: ActionName) {}

  handleCreateClick() {}

  render() {
    return (
      <div>
        <Button
          size="small"
          text="Create group"
          icon="ri-add-circle-line"
          onClick={this.handleCreateClick}
        />
        <Table headers={this.tableHeaders}>{this.groups}</Table>
      </div>
    );
  }
}

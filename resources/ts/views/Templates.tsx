import React, { PureComponent } from "react";
import Actions, { Name as ActionName } from "../components/Actions";
import Button from "../components/Button";
import Date from "../components/Date";
import Table from "../components/Table";
import TableData from "../components/TableData";
import TableRow from "../components/TableRow";

interface Props {}

interface State {}

export default class Templates extends PureComponent<Props, State> {
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
    return ["Title", "Content", "Created at", "Updated at", "Actions"];
  }

  tableRow(template: any) {
    return (
      <TableRow key={template.id}>
        <TableData>{template.title}</TableData>
        <TableData>{template.content}</TableData>
        <TableData>
          <Date date={template.createdAt} />
        </TableData>
        <TableData>
          <Date date={template.updatedAt} />
        </TableData>
        <TableData>
          <Actions
            id={template.id}
            actions={this.tableActions}
            onClick={this.handleActionClick}
          />
        </TableData>
      </TableRow>
    );
  }

  get templates() {
    const templates = [
      {
        id: 1,
        title: "Summer offer",
        content: "Take 20% off your order",
        createdAt: "2022-09-13T03:20:34.091-04:00",
        updatedAt: "2022-09-12T03:20:34.091-04:00",
      },
    ];
    return templates.map((template) => this.tableRow(template));
  }

  handleActionClick(id: number, action: ActionName) {}

  handleCreateClick() {}

  render() {
    return (
      <div>
        <Button
          size="small"
          text="Create template"
          icon="ri-add-circle-line"
          onClick={this.handleCreateClick}
        />
        <Table headers={this.tableHeaders}>{this.templates}</Table>
      </div>
    );
  }
}

import React, { PureComponent } from "react";
import Actions, { Name as ActionName } from "../components/Actions";
import Button from "../components/Button";
import Date from "../components/Date";
import Table from "../components/Table";
import TableData from "../components/TableData";
import TableRow from "../components/TableRow";

interface Props {}

interface State {}

export default class Contacts extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleImportClick = this.handleImportClick.bind(this);
    this.handleExportClick = this.handleExportClick.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  get tableActions(): ActionName[] {
    return ["edit", "delete"];
  }

  get tableHeaders() {
    return ["Phone", "Groups", "Created at", "Updated at", "Actions"];
  }

  tableRow(contact: any) {
    return (
      <TableRow key={contact.id}>
        <TableData>{contact.phone}</TableData>
        <TableData>{contact.groups}</TableData>
        <TableData>
          <Date date={contact.createdAt} />
        </TableData>
        <TableData>
          <Date date={contact.updatedAt} />
        </TableData>
        <TableData>
          <Actions
            id={contact.id}
            actions={this.tableActions}
            onClick={this.handleActionClick}
          />
        </TableData>
      </TableRow>
    );
  }

  get contacts() {
    const contacts = [
      {
        id: 1,
        phone: "+1 983 8534",
        groups: "employees",
        createdAt: "2022-09-13T03:20:34.091-04:00",
        updatedAt: "2022-09-12T03:20:34.091-04:00",
      },
    ];
    return contacts.map((contact) => this.tableRow(contact));
  }

  handleActionClick(id: number, action: ActionName) {}

  handleCreateClick() {}
  handleImportClick() {}
  handleExportClick() {}

  render() {
    return (
      <div>
        <div className="flex flex-wrap gap-5">
          <Button
            size="small"
            text="Create contact"
            icon="ri-add-circle-line"
            onClick={this.handleCreateClick}
          />
          <Button
            size="small"
            text="Import"
            icon="ri-upload-cloud-2-line"
            onClick={this.handleImportClick}
          />
          <Button
            size="small"
            text="Export"
            icon="ri-download-cloud-2-line"
            onClick={this.handleExportClick}
          />
        </div>
        <Table headers={this.tableHeaders}>{this.contacts}</Table>
      </div>
    );
  }
}

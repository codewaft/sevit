import React, { PureComponent } from "react";
import Button from "../components/Button";
import Table from "../components/Table";

interface Props {}

interface State {}

export default class Contacts extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleImportClick = this.handleImportClick.bind(this);
    this.handleExportClick = this.handleExportClick.bind(this);
  }

  get tableHeaders() {
    return ["Phone", "Groups", "Created at", "Updated at", "Actions"];
  }

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
        <Table headers={this.tableHeaders}></Table>
      </div>
    );
  }
}

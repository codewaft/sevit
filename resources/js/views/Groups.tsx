import React, { PureComponent } from "react";
import Button from "../components/Button";
import Table from "../components/Table";

interface Props {}

interface State {}

export default class Groups extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {};
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  get tableHeaders() {
    return ["Title", "Created at", "Updated at", "Actions"];
  }

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
        <Table headers={this.tableHeaders}></Table>
      </div>
    );
  }
}

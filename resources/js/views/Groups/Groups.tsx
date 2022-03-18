import React, { Component, PureComponent } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store";
import { replaceGroups } from "./Groups.slice";
import Actions, { Name as ActionName } from "../../components/Actions";
import Button from "../../components/Button";
import Date from "../../components/Date";
import Table from "../../components/Table";
import TableData from "../../components/TableData";
import TableRow from "../../components/TableRow";

interface Props extends StateProps, DispatchProps {}

class Groups extends Component<Props> {
  constructor(props: Props) {
    super(props);
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
    return this.props.groups.map((group) => this.tableRow(group));
  }

  handleActionClick(id: number, action: ActionName) {}

  handleCreateClick() {}

  componentDidMount() {
    const groups = [
      {
        id: 1,
        title: "Summer offer",
        deleted_at: null,
        created_at: "2022-09-13T03:20:34.091-04:00",
        updated_at: "2022-09-12T03:20:34.091-04:00",
      },
    ];
    this.props.replaceGroups(groups);
  }

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

const mapStateToProps = (state: RootState) => ({
  groups: state.groups.groups,
});

const mapDispatchToProps = {
  replaceGroups,
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(Groups);

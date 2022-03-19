import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { paginateGroups } from "./Groups.thunk";
import Actions, { Name as ActionName } from "../../components/Actions";
import Button from "../../components/Button";
import Date from "../../components/Date";
import Table from "../../components/Table";
import TableData from "../../components/TableData";
import TableRow from "../../components/TableRow";

interface Props extends StateProps, DispatchProps {}

class Groups extends PureComponent<Props> {
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
        <TableData truncate={true}>{group.title}</TableData>
        <TableData>
          <Date date={group.created_at} />
        </TableData>
        <TableData>
          <Date date={group.updated_at} />
        </TableData>
        <TableData>
          <Actions id={group.id} actions={this.tableActions} onClick={this.handleActionClick} />
        </TableData>
      </TableRow>
    );
  }

  get groups() {
    return this.props.groups ? this.props.groups.data.map((group) => this.tableRow(group)) : null;
  }

  handleActionClick(id: number, action: ActionName) {}

  handleCreateClick() {}

  componentDidMount() {
    this.props.paginateGroups();
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
        <Table
          name="groups"
          headers={this.tableHeaders}
          paginate={this.props.groups}
          onPaginate={() => {}}
        >
          {this.groups}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  groups: state.groups.paginate,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  paginateGroups: () => paginateGroups(dispatch),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Groups);

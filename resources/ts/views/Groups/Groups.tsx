import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { Group } from "../../apis/group.api";
import { deleteGroupPrompt, paginateGroups } from "./Groups.thunk";
import {
  ModalName,
  replaceActive as replaceModalActive,
} from "../../components/Modals/Modals.slice";
import {
  replaceId as replaceGroupEditId,
  resetState as resetGroupEditState,
} from "../../components/GroupEdit/GroupEdit.slice";
import { replaceHeading as replaceHeaderHeading } from "../../components/Header/Header.slice";
import Actions, { Name as ActionName } from "../../components/Actions";
import Button from "../../components/Button";
import Date from "../../components/Date";
import Table from "../../components/Table";
import TableData from "../../components/TableData";
import TableRow from "../../components/TableRow";

interface Props extends StateProps, DispatchProps {}

class Groups extends PureComponent<Props> {
  tableHeaders = ["Title", "Created at", "Updated at", "Actions"];
  tableActions: ActionName[] = ["edit", "delete"];

  constructor(props: Props) {
    super(props);
    this.handlePaginate = this.handlePaginate.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  tableRow(group: Group) {
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

  get tableData() {
    const { groups } = this.props;
    return groups && groups.data.map((group) => this.tableRow(group));
  }

  handlePaginate(url: string) {
    this.props.paginateGroups(url);
  }

  handleCreateClick() {
    this.props.replaceModalActive("groupCreate");
  }

  handleActionClick(id: number, action: ActionName) {
    switch (action) {
      case "edit":
        this.props.resetGroupEditState();
        this.props.replaceGroupEditId(id);
        return this.props.replaceModalActive("groupEdit");
      case "delete":
        return this.props.deleteGroupPrompt(id);
    }
  }

  componentDidMount() {
    this.props.replaceHeaderHeading("Groups");
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
          onPaginate={this.handlePaginate}
        >
          {this.tableData}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  groups: state.groups.paginate,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  paginateGroups: (url?: string) => dispatch(paginateGroups(url)),
  resetGroupEditState: () => dispatch(resetGroupEditState()),
  replaceGroupEditId: (id: number) => dispatch(replaceGroupEditId(id)),
  replaceModalActive: (name: ModalName) => dispatch(replaceModalActive(name)),
  deleteGroupPrompt: (id: number) => dispatch(deleteGroupPrompt(id)),
  replaceHeaderHeading: (heading: string) => dispatch(replaceHeaderHeading(heading)),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Groups);

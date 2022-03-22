import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { join, map } from "lodash";
import { RootDispatch, RootState } from "../../store/store";
import { paginateContacts } from "./Contacts.thunk";
import { Contact } from "../../apis/contact.api";
import { Group } from "../../apis/group.api";
import {
  ModalName,
  replaceActive as replaceModalActive,
} from "../../components/Modals/Modals.slice";
import {
  replaceId as replaceContactEditId,
  resetState as resetContactEditState,
} from "../../components/ContactEdit/ContactEdit.slice";
import Actions, { Name as ActionName } from "../../components/Actions";
import Button from "../../components/Button";
import Date from "../../components/Date";
import Table from "../../components/Table";
import TableData from "../../components/TableData";
import TableRow from "../../components/TableRow";

interface Props extends StateProps, DispatchProps {}

class Contacts extends PureComponent<Props> {
  tableActions: ActionName[] = ["edit", "delete"];
  tableHeaders = ["Phone", "Groups", "Created at", "Updated at", "Actions"];

  constructor(props: Props) {
    super(props);
    this.handlePaginate = this.handlePaginate.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleImportClick = this.handleImportClick.bind(this);
    this.handleExportClick = this.handleExportClick.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  groups(groups: Group[]) {
    return join(map(groups, (group) => group.title));
  }

  tableRow(contact: Contact) {
    return (
      <TableRow key={contact.id}>
        <TableData>{contact.phone}</TableData>
        <TableData truncate={true}>{this.groups(contact.groups)}</TableData>
        <TableData>
          <Date date={contact.created_at} />
        </TableData>
        <TableData>
          <Date date={contact.updated_at} />
        </TableData>
        <TableData>
          <Actions id={contact.id} actions={this.tableActions} onClick={this.handleActionClick} />
        </TableData>
      </TableRow>
    );
  }

  get tableData() {
    const { contacts } = this.props;
    return contacts && contacts.data.map((contact) => this.tableRow(contact));
  }

  handlePaginate(url: string) {
    this.props.paginateContacts(url);
  }

  handleCreateClick() {
    this.props.replaceModalActive("contactCreate");
  }

  handleImportClick() {}
  handleExportClick() {}

  handleActionClick(id: number, action: ActionName) {
    if (action === "edit") {
      this.props.resetContactEditState();
      this.props.replaceContactEditId(id);
      this.props.replaceModalActive("contactEdit");
    }
  }

  componentDidMount() {
    this.props.paginateContacts();
  }

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
        <Table
          name="contacts"
          headers={this.tableHeaders}
          paginate={this.props.contacts}
          onPaginate={this.handlePaginate}
        >
          {this.tableData}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  contacts: state.contacts.paginate,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  paginateContacts: (url?: string) => dispatch(paginateContacts(url)),
  resetContactEditState: () => dispatch(resetContactEditState()),
  replaceContactEditId: (id: number) => dispatch(replaceContactEditId(id)),
  replaceModalActive: (name: ModalName) => dispatch(replaceModalActive(name)),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Contacts);

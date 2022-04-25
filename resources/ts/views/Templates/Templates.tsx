import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { deleteTemplatePrompt, paginateTemplates } from "./Templates.thunk";
import {
  ModalName,
  replaceActive as replaceModalActive,
} from "../../components/Modals/Modals.slice";
import {
  replaceId as replaceTemplateEditId,
  resetState as resetTemplateEditState,
} from "../../components/TemplateEdit/TemplateEdit.slice";
import { replaceHeading as replaceHeaderHeading } from "../../components/Header/Header.slice";
import { Template } from "../../apis/template.api";
import Actions, { Name as ActionName } from "../../components/Actions";
import Button from "../../components/Button";
import Date from "../../components/Date";
import Table from "../../components/Table";
import TableData from "../../components/TableData";
import TableRow from "../../components/TableRow";

interface Props extends StateProps, DispatchProps {}

class Templates extends PureComponent<Props> {
  tableActions: ActionName[] = ["edit", "delete"];
  tableHeaders = ["Title", "Content", "Created at", "Updated at", "Actions"];

  constructor(props: Props) {
    super(props);
    this.handlePaginate = this.handlePaginate.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  tableRow(template: Template) {
    return (
      <TableRow key={template.id}>
        <TableData truncate="medium">{template.title}</TableData>
        <TableData truncate="medium">{template.content}</TableData>
        <TableData>
          <Date date={template.created_at} />
        </TableData>
        <TableData>
          <Date date={template.updated_at} />
        </TableData>
        <TableData>
          <Actions id={template.id} actions={this.tableActions} onClick={this.handleActionClick} />
        </TableData>
      </TableRow>
    );
  }

  get tableData() {
    const { templates } = this.props;
    return templates && templates.data.map((template) => this.tableRow(template));
  }

  handlePaginate(url: string) {
    this.props.paginateTemplates(url);
  }

  handleActionClick(id: number, action: ActionName) {
    const {
      resetTemplateEditState,
      replaceTemplateEditId,
      replaceModalActive,
      deleteTemplatePrompt,
    } = this.props;
    switch (action) {
      case "edit":
        resetTemplateEditState();
        replaceTemplateEditId(id);
        return replaceModalActive("templateEdit");
      case "delete":
        return deleteTemplatePrompt(id);
    }
  }

  handleCreateClick() {
    this.props.replaceModalActive("templateCreate");
  }

  componentDidMount() {
    this.props.replaceHeaderHeading("Templates");
    this.props.paginateTemplates();
  }

  render() {
    return (
      <div>
        <Button
          size="small"
          text="Create template"
          icon="ri-add-circle-line"
          onClick={this.handleCreateClick}
        />
        <Table
          name="templates"
          headers={this.tableHeaders}
          paginate={this.props.templates}
          onPaginate={this.handlePaginate}
        >
          {this.tableData}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  templates: state.templates.paginate,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  paginateTemplates: (url?: string) => dispatch(paginateTemplates(url)),
  resetTemplateEditState: () => dispatch(resetTemplateEditState()),
  replaceTemplateEditId: (id: number) => dispatch(replaceTemplateEditId(id)),
  replaceModalActive: (name: ModalName) => dispatch(replaceModalActive(name)),
  deleteTemplatePrompt: (id: number) => dispatch(deleteTemplatePrompt(id)),
  replaceHeaderHeading: (heading: string) => dispatch(replaceHeaderHeading(heading)),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Templates);

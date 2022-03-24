import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { join, map } from "lodash";
import { RootDispatch, RootState } from "../../store/store";
import { deleteBroadcastPrompt, paginateBroadcasts } from "./Broadcasts.thunk";
import {
  ModalName,
  replaceActive as replaceModalActive,
} from "../../components/Modals/Modals.slice";
import {
  replaceId as replaceBroadcastId,
  resetState as resetBroadcastState,
} from "../../components/Broadcast/Broadcast.slice";
import {
  replaceId as replaceBroadcastMessagesId,
  resetState as resetBroadcastMessagesState,
} from "../../components/BroadcastMessages/BroadcastMessages.slice";
import { replaceHeading as replaceHeaderHeading } from "../../components/Header/Header.slice";
import { Broadcast } from "../../apis/broadcast.api";
import { Group } from "../../apis/group.api";
import Actions, { Name as ActionName } from "../../components/Actions";
import Button from "../../components/Button";
import Date from "../../components/Date";
import Status from "../../components/Status";
import Table from "../../components/Table";
import TableData from "../../components/TableData";
import TableRow from "../../components/TableRow";

interface Props extends StateProps, DispatchProps {}

class Broadcasts extends PureComponent<Props> {
  tableActions: ActionName[] = ["view", "messages", "edit", "delete"];
  tableHeaders = ["Title", "Template", "Target", "Schedule", "Status", "Actions"];

  constructor(props: Props) {
    super(props);
    this.handlePaginate = this.handlePaginate.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
    this.handleActionClick = this.handleActionClick.bind(this);
  }

  target(groups: Group[]) {
    const target = join(map(groups, (group) => group.title));
    return target || "all";
  }

  tableRow(broadcast: Broadcast) {
    return (
      <TableRow key={broadcast.id}>
        <TableData truncate="small">{broadcast.title}</TableData>
        <TableData truncate="small">{broadcast.template.title}</TableData>
        <TableData truncate="small">{this.target(broadcast.groups)}</TableData>
        <TableData>
          <Date date={broadcast.scheduled_at} />
        </TableData>
        <TableData>
          <Status name={broadcast.status} />
        </TableData>
        <TableData>
          <Actions id={broadcast.id} actions={this.tableActions} onClick={this.handleActionClick} />
        </TableData>
      </TableRow>
    );
  }

  get tableData() {
    const { broadcasts } = this.props;
    return broadcasts && broadcasts.data.map((broadcast) => this.tableRow(broadcast));
  }

  handlePaginate(url: string) {
    this.props.paginateBroadcasts(url);
  }

  handleActionClick(id: number, action: ActionName) {
    switch (action) {
      case "view":
        this.props.resetBroadcastState();
        this.props.replaceBroadcastId(id);
        return this.props.replaceModalActive("broadcast");
      case "messages":
        this.props.resetBroadcastMessagesState();
        this.props.replaceBroadcastMessagesId(id);
        return this.props.replaceModalActive("broadcastMessages");
      case "edit":
        return this.props.replaceModalActive("broadcastEdit");
      case "delete":
        return this.props.deleteBroadcastPrompt(id);
    }
  }

  handleCreateClick() {
    this.props.replaceModalActive("broadcastCreate");
  }

  componentDidMount() {
    this.props.replaceHeaderHeading("Broadcasts");
    this.props.paginateBroadcasts();
  }

  render() {
    return (
      <div>
        <Button
          size="small"
          text="Create broadcast"
          icon="ri-add-circle-line"
          onClick={this.handleCreateClick}
        />
        <Table
          name="broadcasts"
          headers={this.tableHeaders}
          paginate={this.props.broadcasts}
          onPaginate={this.handlePaginate}
        >
          {this.tableData}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  broadcasts: state.broadcasts.paginate,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  paginateBroadcasts: (url?: string) => dispatch(paginateBroadcasts(url)),
  resetBroadcastState: () => dispatch(resetBroadcastState()),
  replaceBroadcastId: (id: number) => dispatch(replaceBroadcastId(id)),
  resetBroadcastMessagesState: () => dispatch(resetBroadcastMessagesState()),
  replaceBroadcastMessagesId: (id: number) => dispatch(replaceBroadcastMessagesId(id)),
  replaceModalActive: (name: ModalName) => dispatch(replaceModalActive(name)),
  deleteBroadcastPrompt: (id: number) => dispatch(deleteBroadcastPrompt(id)),
  replaceHeaderHeading: (heading: string) => dispatch(replaceHeaderHeading(heading)),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Broadcasts);

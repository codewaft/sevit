import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { Broadcast, Message } from "../../apis/broadcast.api";
import { replaceBroadcast } from "./BroadcastMessages.slice";
import { readBroadcast, paginateBroadcastMessages } from "./BroadcastMessages.thunk";
import { selectBroadcastCountStatus } from "./BroadcastMesages.select";
import Heading from "../Heading";
import Date from "../Date";
import Status from "../Status";
import Table from "../Table";
import TableData from "../TableData";
import TableRow from "../TableRow";

interface Props extends StateProps, DispatchProps {}

class BroadcastMessages extends PureComponent<Props> {
  tableHeaders = ["ID", "Phone", "Status", "Processed at"];

  constructor(props: Props) {
    super(props);
    this.handlePaginate = this.handlePaginate.bind(this);
  }

  get header() {
    const { broadcast, countStatus } = this.props;
    return (
      broadcast && (
        <div className="flex gap-3 items-center">
          <Heading size="regular" text={broadcast.title} />
          <Status name={broadcast.status} append={countStatus} />
        </div>
      )
    );
  }

  handlePaginate(url: string) {
    this.props.paginateBroadcastMessages(url);
  }

  tableRow(message: Message) {
    return (
      <TableRow key={message.id}>
        <TableData>{message.reference_id}</TableData>
        <TableData>{message.contact.phone}</TableData>
        <TableData>
          <Status name={message.status} />
        </TableData>
        <TableData>
          <Date date={message.processed_at} />
        </TableData>
      </TableRow>
    );
  }

  get messages() {
    const { broadcastMessages } = this.props;
    return broadcastMessages && broadcastMessages.data.map((message) => this.tableRow(message));
  }

  componentDidMount() {
    this.props.readBroadcast();
    this.props.paginateBroadcastMessages();
  }

  render() {
    return (
      <div className="px-5 md:px-10 pb-10">
        {this.header}
        <Table
          name="messages"
          headers={this.tableHeaders}
          paginate={this.props.broadcastMessages}
          onPaginate={this.handlePaginate}
        >
          {this.messages}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  broadcast: state.broadcastMessages.broadcast,
  broadcastMessages: state.broadcastMessages.messagePaginate,
  countStatus: selectBroadcastCountStatus(state),
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  paginateBroadcastMessages: (url?: string) => dispatch(paginateBroadcastMessages(url)),
  replaceBroadcast: (broadcast: Broadcast) => dispatch(replaceBroadcast(broadcast)),
  readBroadcast: () => dispatch(readBroadcast()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastMessages);

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { Broadcast } from "../../apis/broadcast.api";
import { replaceBroadcast } from "./BroadcastMessages.slice";
import { readBroadcast } from "./BroadcastMessages.thunk";
import Heading from "../Heading";
import Date from "../Date";
import Status from "../Status";
import Table from "../Table";
import TableData from "../TableData";
import TableRow from "../TableRow";

interface Props extends StateProps, DispatchProps {}

class BroadcastMessages extends PureComponent<Props> {
  tableHeaders = ["ID", "Phone", "Status", "Processed at"];

  get completed() {
    return `(${185}/${190})`;
  }

  get status() {
    const { broadcast } = this.props;
    if (!broadcast) return null;
    return <Status name={broadcast.status} append={this.completed} />;
  }

  tableRow(message: any) {
    return (
      <TableRow key={message.id}>
        <TableData>{message.id}</TableData>
        <TableData>{message.phone}</TableData>
        <TableData>
          <Status name={message.status} />
        </TableData>
        <TableData>
          <Date date={message.processedAt} />
        </TableData>
      </TableRow>
    );
  }

  get messages() {
    const messages = [
      {
        id: "hf0343jfdfk",
        phone: "+1 983 8534",
        status: "failed",
        processedAt: "2022-09-12T03:20:34.091-04:00",
      },
    ];
    return messages.map((message) => this.tableRow(message));
  }

  componentDidMount() {
    this.props.readBroadcast();
  }

  render() {
    return (
      <div className="px-10 pb-10">
        <div className="flex gap-3 items-center">
          <Heading size="regular" text="Summer offer" />
          {this.status}
        </div>
        <Table name="messages" headers={this.tableHeaders} paginate={null} onPaginate={() => {}}>
          {this.messages}
        </Table>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  broadcast: state.broadcastMessages.broadcast,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  replaceBroadcast: (broadcast: Broadcast) => dispatch(replaceBroadcast(broadcast)),
  readBroadcast: () => dispatch(readBroadcast()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(BroadcastMessages);

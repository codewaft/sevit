import React, { PureComponent } from "react";
import { connect } from "react-redux";
import dateUtil from "../../utils/date.util";
import { RootDispatch, RootState } from "../../store/store";
import { Broadcast as BroadcastData } from "../../apis/broadcast.api";
import { replaceBroadcast } from "./Broadcast.slice";
import { readBroadcast } from "./Broadcast.thunk";
import Label from "../Label";
import Heading from "../Heading";
import Icon from "../Icon";
import Status from "../Status";

interface Props extends StateProps, DispatchProps {}

class Broadcast extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
  }

  get completed() {
    return `(${185}/${190})`;
  }

  get status() {
    const { broadcast } = this.props;
    if (!broadcast) return null;
    return <Status name={broadcast.status} append={this.completed} />;
  }

  get template() {
    const { broadcast } = this.props;
    if (!broadcast) return null;
    const { template } = broadcast;
    return template && <p className="text-md text-slate-600 mt-4 mb-3">{template.content}</p>;
  }

  get groups() {
    const { broadcast } = this.props;
    if (!broadcast) return null;
    const { groups } = broadcast;
    return groups.map((group) => (
      <Label className="mr-2.5 mb-2" type="secondary" text={group.title} key={group.id} />
    ));
  }

  get dates() {
    const { broadcast } = this.props;
    if (!broadcast) return null;
    const scheduledAt = dateUtil.format(broadcast.scheduled_at);
    const createdAt = dateUtil.format(broadcast.created_at);
    const updatedAt = dateUtil.format(broadcast.updated_at);
    return (
      broadcast && (
        <div className="flex gap-3 mt-3">
          <div className="text-slate-400">
            <Icon size="large" name="ri-time-line" />
          </div>
          <div>
            <div className="text-sm leading-6">
              <span className="text-slate-900 font-medium">Scheduled at: </span>
              <span className="text-slate-600">{scheduledAt}</span>
            </div>
            <div className="text-sm leading-6">
              <span className="text-slate-900 font-medium">Created at: </span>
              <span className="text-slate-600">{createdAt}</span>
            </div>
            <div className="text-sm leading-6">
              <span className="text-slate-900 font-medium">Updated at: </span>
              <span className="text-slate-600">{updatedAt}</span>
            </div>
          </div>
        </div>
      )
    );
  }

  componentDidMount() {
    this.props.readBroadcast();
  }

  render() {
    return (
      <div className="px-10 pb-10">
        <Heading size="regular" text="Summer offer" />
        {this.status}
        {this.template}
        {this.groups}
        {this.dates}
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  broadcast: state.broadcast.broadcast,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  replaceBroadcast: (broadcast: BroadcastData) => dispatch(replaceBroadcast(broadcast)),
  readBroadcast: () => dispatch(readBroadcast()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Broadcast);

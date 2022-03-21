import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { removeConfirm } from "./Confirm.slice";
import { handleConfirm } from "./Confirm.thunk";
import Notify from "../Notify";

interface Props extends StateProps, DispatchProps {}

class Confirm extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleCancel = this.handleCancel.bind(this);
    this.handleConfirm = this.handleConfirm.bind(this);
  }

  handleCancel() {
    this.props.removeConfirm();
  }

  handleConfirm() {
    this.props.handleConfirm();
  }

  render() {
    const { confirm } = this.props;
    return (
      confirm && (
        <Notify type={confirm.type}>
          <div className="flex gap-4 items-center">
            {confirm.message}
            <div
              className="text-red-500 uppercase text-sm font-medium cursor-pointer"
              onClick={this.handleConfirm}
            >
              Yes
            </div>
            <div
              className="text-slate-900 uppercase text-sm font-medium cursor-pointer"
              onClick={this.handleCancel}
            >
              Cancel
            </div>
          </div>
        </Notify>
      )
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  confirm: state.confirm.confirm,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  removeConfirm: () => dispatch(removeConfirm()),
  handleConfirm: () => dispatch(handleConfirm()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Confirm);

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import Notify from "../Notify";

interface Props extends StateProps, DispatchProps {}

class Alert extends PureComponent<Props> {
  render() {
    const { alert } = this.props;
    return alert && <Notify type={alert.type}>{alert.message}</Notify>;
  }
}

const mapStateToProps = (state: RootState) => ({
  alert: state.alert.alert,
});

const mapDisptachToProps = (dispatch: RootDispatch) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDisptachToProps>;

export default connect(mapStateToProps, mapDisptachToProps)(Alert);

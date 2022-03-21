import React, { Component } from "react";
import { connect } from "react-redux";
import { RootState } from "../../store/store";

interface Props extends StateProps, DispatchProps {}

class ProgressBar extends Component<Props> {
  get className() {
    return "bg-primary h-1 transition-width ease-linear absolute inset-x-0 top-0 duration-100 bg-sky-500 z-30";
  }

  get style() {
    return { width: `${this.props.progress}%` };
  }

  render() {
    return <div className={this.className} style={this.style} />;
  }
}

const mapStateToProps = (state: RootState) => ({
  progress: state.progressBar.progress,
});

const mapDispatchToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(ProgressBar);

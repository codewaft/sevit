import { Component } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { NavigateProps, withNavigate } from "../../hocs/withNavigate";

interface Props extends StateProps, DispatchProps, NavigateProps {}

class AutoNavigate extends Component<Props> {
  componentDidUpdate(prevProps: Props) {
    const { route } = this.props;
    if (route && route !== prevProps.route) {
      this.props.navigate(route);
    }
  }
  render() {
    return null;
  }
}

const mapStateToProps = (state: RootState) => ({
  route: state.autoNavigate.route,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(withNavigate(AutoNavigate));

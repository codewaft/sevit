import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import Heading from "../Heading";
import Logo from "../Logo";
import User from "../User";

interface Props extends StateProps, DispatchProps {}

class Header extends PureComponent<Props> {
  render() {
    return (
      <div className="drop-shadow-md bg-white">
        <div className="container mx-auto">
          <div className="grid grid-cols-12 gap-7 py-2">
            <div className="col-span-3">
              <Logo />
            </div>
            <div className="col-span-9 flex justify-between items-center">
              <Heading size="medium" text={this.props.heading} />
              <User username="johnsmith" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  heading: state.header.heading,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Header);

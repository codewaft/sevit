import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { readUser } from "./Header.thunk";
import Heading from "../Heading";
import Logo from "../Logo";
import User from "../User";

interface Props extends StateProps, DispatchProps {}

class Header extends PureComponent<Props> {
  get username() {
    const { user } = this.props;
    return user ? user.username : "Howdy";
  }

  componentDidMount() {
    this.props.readUser();
  }

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
              <User username={this.username} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  heading: state.header.heading,
  user: state.header.user,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  readUser: () => dispatch(readUser()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(Header);

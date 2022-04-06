import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { readUser } from "./Header.thunk";
import Heading from "../Heading";
import Logo from "../Logo";
import User from "../User/User";

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
        <div className="md:container mx-auto">
          <div className="grid grid-cols-12 gap-2 md:gap-7 py-2">
            <div className="col-span-5 sm:col-span-3 md:col-span-4 lg:col-span-3">
              <Logo />
            </div>
            <div className="col-span-7 sm:col-span-9 md:col-span-8 lg:col-span-9 flex justify-between items-center">
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

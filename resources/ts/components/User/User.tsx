import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { first, upperCase } from "lodash";
import { RootDispatch, RootState } from "../../store/store";
import { signOut } from "./User.thunk";

interface Props extends StateProps, DispatchProps {
  username: string;
}

class User extends PureComponent<Props> {
  constructor(props: Props) {
    super(props);
    this.handleSignOutClick = this.handleSignOutClick.bind(this);
  }

  get usernameFirstLetter() {
    return upperCase(first(this.props.username));
  }

  handleSignOutClick() {
    this.props.signOut();
  }

  render() {
    return (
      <div className="inline-flex gap-3.5 items-center">
        <div className="bg-sky-400 text-white rounded-full h-10 w-10 flex justify-center items-center text-2xl">
          {this.usernameFirstLetter}
        </div>
        <div>
          <div className="font-medium text-slate-600 text-md">{this.props.username}</div>
          <div
            className="text-slate-500 text-sm -mt-0.5 cursor-pointer w-fit"
            onClick={this.handleSignOutClick}
          >
            Sign out
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  signOut: () => dispatch(signOut()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(User);

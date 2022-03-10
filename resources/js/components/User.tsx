import React, { PureComponent } from "react";
import { first, upperCase } from "lodash";

interface Props {
  username: string;
}

export default class User extends PureComponent<Props> {
  get usernameFirstLetter() {
    return upperCase(first(this.props.username));
  }

  handleLogoutClick() {}

  render() {
    return (
      <div className="inline-flex gap-3.5 items-center">
        <div className="bg-sky-400 text-white rounded-full h-10 w-10 flex justify-center items-center text-2xl">
          {this.usernameFirstLetter}
        </div>
        <div>
          <div className="font-medium text-slate-600 text-md">
            {this.props.username}
          </div>
          <div
            className="text-slate-500 text-sm -mt-0.5 cursor-pointer w-fit"
            onClick={this.handleLogoutClick}
          >
            Logout
          </div>
        </div>
      </div>
    );
  }
}

import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { RootDispatch, RootState } from "../../store/store";
import { replaceFormPassword, replaceFormUsername } from "./SignIn.slice";
import { signIn } from "./SignIn.thunk";
import Button from "../../components/Button";
import Card from "../../components/Card";
import Heading from "../../components/Heading";
import Input from "../../components/Input";
import Logo from "../../components/Logo";

interface Props extends StateProps, DispatchProps {}

class SignIn extends PureComponent<Props> {
  handleInputChange = (name: string, value: string) => {
    if (name === "username") this.props.replaceFormUsername(value);
    else if (name === "password") this.props.replaceFormPassword(value);
  };

  render() {
    return (
      <div className="bg-sky-500 h-screen w-screen">
        <div className="container mx-auto flex justify-center items-center h-full">
          <Card
            color="gray"
            className="px-5 md:px-10 pt-8 pb-10 lg:w-4/12 md:w-5/12 sm:w-6/12 w-11/12 max-h-[calc(100%-2rem)] overflow-y-auto"
          >
            <Logo />
            <Heading className="mt-8 mb-1" size="large" text="Sign in" />
            <p className="text-slate-600 text-md mb-6">Please sign in into Sevit</p>
            <Input
              type="text"
              name="username"
              label="Username"
              value={this.props.form.username}
              placeholder="Enter your username"
              onChange={this.handleInputChange}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={this.props.form.password}
              placeholder="Enter your password"
              onChange={this.handleInputChange}
            />
            <Button
              size="regular"
              text="Sign in"
              icon="ri-login-circle-line"
              onClick={this.props.signIn}
            />
          </Card>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  form: state.signIn.form,
});

const mapDispatchToProps = (dispatch: RootDispatch) => ({
  replaceFormUsername: (username: string) => dispatch(replaceFormUsername(username)),
  replaceFormPassword: (password: string) => dispatch(replaceFormPassword(password)),
  signIn: () => dispatch(signIn()),
});

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

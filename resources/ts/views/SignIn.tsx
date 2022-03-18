import React, { PureComponent } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import Heading from "../components/Heading";
import Input from "../components/Input";
import Logo from "../components/Logo";

interface Props {}

interface State {
  username: string;
  password: string;
}

export default class SignIn extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      username: "",
      password: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSignInClick = this.handleSignInClick.bind(this);
  }

  handleInputChange(name: string, value: string) {
    if (name === "username") this.setState({ username: value });
    if (name === "password") this.setState({ password: value });
  }

  handleSignInClick() {}

  render() {
    return (
      <div className="bg-sky-500 h-screen w-screen">
        <div className="container mx-auto flex justify-center items-center h-full">
          <Card
            color="gray"
            className="px-10 pt-8 pb-10 w-1/3 max-h-[calc(100%-2rem)] overflow-y-auto"
          >
            <Logo />
            <Heading className="mt-8 mb-1" size="large" text="Sign in" />
            <p className="text-slate-600 text-md mb-6">
              Please sign in into StackSMS
            </p>
            <Input
              type="text"
              name="username"
              label="Username"
              value={this.state.username}
              placeholder="Enter your username"
              onChange={this.handleInputChange}
            />
            <Input
              type="password"
              name="password"
              label="Password"
              value={this.state.password}
              placeholder="Enter your password"
              onChange={this.handleInputChange}
            />
            <Button
              size="regular"
              text="Sign in"
              icon="ri-login-circle-line"
              onClick={this.handleSignInClick}
            />
          </Card>
        </div>
      </div>
    );
  }
}

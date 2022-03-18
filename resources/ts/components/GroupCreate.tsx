import React, { PureComponent } from "react";
import Button from "./Button";
import Input from "./Input";

interface Props {}

interface State {
  title: string;
}

export default class GroupCreate extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleInputChange(name: string, value: string) {
    if (name === "title") this.setState({ title: value });
  }

  handleCreateClick() {}

  render() {
    return (
      <div className="px-10 pb-10">
        <Input
          type="text"
          name="title"
          label="Title"
          value={this.state.title}
          placeholder="Enter group title"
          onChange={this.handleInputChange}
        />
        <Button
          size="regular"
          text="Create group"
          icon="ri-add-circle-line"
          onClick={this.handleCreateClick}
        />
      </div>
    );
  }
}

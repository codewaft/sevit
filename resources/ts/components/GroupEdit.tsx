import React, { PureComponent } from "react";
import Button from "./Button";
import Input from "./Input";

interface Props {}

interface State {
  title: string;
}

export default class GroupEdit extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleEditClick = this.handleEditClick.bind(this);
  }

  handleInputChange(name: string, value: string) {
    if (name === "title") this.setState({ title: value });
  }

  handleEditClick() {}

  readGroup() {}

  componentDidMount() {
    this.readGroup();
  }

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
          text="Update group"
          icon="ri-pencil-line"
          onClick={this.handleEditClick}
        />
      </div>
    );
  }
}

import React, { PureComponent } from "react";
import Button from "./Button";
import Input from "./Input";
import MessagePreview from "./MessagePreview";
import Textarea from "./Textarea";

interface Props {}

interface State {
  title: string;
  content: string;
}

export default class TemplateCreate extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
      content: "",
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleCreateClick = this.handleCreateClick.bind(this);
  }

  handleInputChange(name: string, value: string) {
    if (name === "title") this.setState({ title: value });
    if (name === "content") this.setState({ content: value });
  }

  handleCreateClick() {}

  render() {
    return (
      <div className="grid grid-cols-2 gap-5 px-10">
        <div className="pb-10">
          <Input
            type="text"
            name="title"
            label="Title"
            value={this.state.title}
            placeholder="Enter message title"
            onChange={this.handleInputChange}
          />
          <Textarea
            name="content"
            label="Content"
            value={this.state.content}
            rows={4}
            placeholder="Enter content"
            onChange={this.handleInputChange}
          />
          <Button
            size="regular"
            text="Create template"
            icon="ri-add-circle-line"
            onClick={this.handleCreateClick}
          />
        </div>
        <div className="flex items-end justify-center">
          <MessagePreview text={this.state.content} />
        </div>
      </div>
    );
  }
}

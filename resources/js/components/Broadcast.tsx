import React, { PureComponent } from "react";
import { Group, Template } from "./BroadcastCreate";
import Label from "./Label";
import Heading from "./Heading";
import Icon from "./Icon";

interface Props {}

interface State {
  title: string;
  template: Template | null;
  groups: Group[];
}

export default class Broadcast extends PureComponent<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      title: "",
      template: null,
      groups: [],
    };
  }

  get template() {
    const { template } = this.state;
    return (
      template && (
        <p className="text-md text-slate-600 mt-4 mb-3">{template.content}</p>
      )
    );
  }

  get groups() {
    const { groups } = this.state;
    return groups.map((group) => (
      <Label
        className="mr-2.5 mb-2"
        type="secondary"
        text={group.title}
        key={group.id}
      />
    ));
  }

  readBroadcast() {
    this.setState({
      template: {
        id: 1,
        title: "Summer offer",
        content:
          "New line, who dis? Excited to launch our product and you’re the first to know. Check it out now. Text STOP to opt-out.",
      },
      groups: [
        { id: 1, title: "VIP" },
        { id: 2, title: "Student" },
        { id: 3, title: "Employee" },
      ],
    });
  }

  componentDidMount() {
    this.readBroadcast();
  }

  render() {
    return (
      <div className="px-10 pb-10">
        <Heading size="regular" text="Summer offer" />
        <Label type="success" text="completed (185/190)" />
        {this.template}
        {this.groups}
        <div className="flex gap-3 mt-3">
          <div className="text-slate-400">
            <Icon size="large" name="ri-time-line" />
          </div>
          <div>
            <div className="text-sm leading-6">
              <span className="text-slate-900 font-medium">Scheduled at: </span>
              <span className="text-slate-600">Mar 12, 2022 10:54 PM</span>
            </div>
            <div className="text-sm leading-6">
              <span className="text-slate-900 font-medium">Created at: </span>
              <span className="text-slate-600">Mar 10, 2022 10:38 PM</span>
            </div>
            <div className="text-sm leading-6">
              <span className="text-slate-900 font-medium">Updated at: </span>
              <span className="text-slate-600">Mar 11, 2022 11:31 PM</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

import React, { PureComponent } from "react";
import Icon from "./Icon";

export type Name = "view" | "messages" | "edit" | "delete";
type Icons = Record<Name, string>;

interface Props {
  id: number;
  actions: Name[];
  onClick: (id: number, action: Name) => void;
}

export default class Actions extends PureComponent<Props> {
  icons: Icons = {
    view: "ri-eye-line",
    messages: "ri-message-3-line",
    edit: "ri-pencil-line",
    delete: "ri-delete-bin-6-line",
  };

  get actions() {
    return this.props.actions.map((action) => this.action(action));
  }

  action(action: Name) {
    const handleClick = () => this.props.onClick(this.props.id, action);
    return (
      <Icon
        size="medium"
        name={this.icons[action]}
        onClick={handleClick}
        key={action}
      />
    );
  }

  render() {
    return (
      <div className="inline-flex gap-1 text-slate-600">{this.actions}</div>
    );
  }
}

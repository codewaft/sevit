import React, { PureComponent } from "react";
import { upperFirst } from "lodash";
import Icon from "./Icon";
import { NavLink } from "react-router-dom";
import routes from "../routes";

export const items = ["broadcasts", "templates", "contacts", "groups"] as const;
export type Name = typeof items[number];
type Icons = Record<Name, string>;

interface Props {
  name: Name;
}

export default class MenuItem extends PureComponent<Props> {
  icons: Icons = {
    broadcasts: "ri-broadcast-line",
    templates: "ri-chat-4-line",
    contacts: "ri-phone-line",
    groups: "ri-group-line",
  };

  isActive() {
    return this.props.name === "templates";
  }

  get icon() {
    return this.icons[this.props.name];
  }

  get name() {
    return upperFirst(this.props.name);
  }

  get route() {
    return routes[this.props.name];
  }

  get baseClass() {
    return "flex gap-5 items-center rounded-l-md px-5 py-2 cursor-pointer text-[19px]";
  }

  get activeClass() {
    const active = "text-slate-900 bg-white font-medium drop-shadow-md";
    return `${this.baseClass} ${active}`;
  }

  get commonClass() {
    const common = "text-white";
    return `${this.baseClass} ${common}`;
  }

  render() {
    return (
      <NavLink
        className={({ isActive }) =>
          isActive ? this.activeClass : this.commonClass
        }
        to={this.route}
      >
        <Icon size="large" name={this.icon} />
        {this.name}
      </NavLink>
    );
  }
}

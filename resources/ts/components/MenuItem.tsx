import React, { PureComponent } from "react";
import { upperFirst } from "lodash";
import Icon from "./Icon";
import { LinkProps, NavLink, NavLinkProps } from "react-router-dom";
import routes from "../routes";

export const items = ["broadcasts", "templates", "contacts", "groups"] as const;
export type Name = typeof items[number];

type Icons = Record<Name, string>;
type NavLinkClassName = { isActive: boolean };

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
    return "flex gap-5 items-center justify-center w-full py-3 md:rounded-l-md md:justify-start md:px-5 md:py-2 cursor-pointer text-[19px]";
  }

  get inactiveClass() {
    const common = "text-white";
    return `${this.baseClass} ${common}`;
  }

  get activeClass() {
    const active = "text-slate-900 bg-white font-medium drop-shadow-md";
    return `${this.baseClass} ${active}`;
  }

  className = ({ isActive }: NavLinkClassName) => {
    return isActive ? this.activeClass : this.inactiveClass;
  };

  render() {
    return (
      <NavLink className={this.className} to={this.route}>
        <Icon size="large" name={this.icon} />
        <span className="hidden md:inline-block">{this.name}</span>
      </NavLink>
    );
  }
}

import React, { PureComponent } from "react";
import MenuItem, { items, Name as MenuItemName } from "./MenuItem";

export default class Menu extends PureComponent {
  item(item: MenuItemName) {
    return <MenuItem name={item} key={item} />;
  }

  get menuItems() {
    return items.map((item) => this.item(item));
  }

  render() {
    return <div className="flex justify-between md:block">{this.menuItems}</div>;
  }
}

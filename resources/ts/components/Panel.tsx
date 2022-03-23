import React, { PureComponent } from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header/Header";
import Menu from "./Menu";

export default class Panel extends PureComponent {
  get style() {
    return {
      background: "linear-gradient(90deg, #38C4F8 0%, #38C4F8 50%, #e2e8f0 50%, #e2e8f0 100%)",
    };
  }

  get sidebarStyle() {
    return {
      boxShadow: "3px 0px 7px -5px rgb(0 0 0 / 75%)",
    };
  }

  render() {
    return (
      <div className="min-h-screen" style={this.style}>
        <Header />
        <div className="container mx-auto bg-slate-200">
          <div className="grid grid-flow-col grid-cols-12 gap-7 h-[calc(100vh_-_64px)]">
            <div className="col-span-3 bg-[#38C4F8] pt-6" style={this.sidebarStyle}>
              <Menu />
            </div>
            <div className="col-span-9 py-7 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

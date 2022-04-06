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
        <div className="w-full md:container mx-auto bg-slate-200">
          <div className="grid grid-flow-col grid-cols-12 gap-7 h-[calc(100vh_-_64px)]">
            <div
              className="w-full absolute inset-x-0 bottom-0 z-10 md:w-auto md:relative md:col-span-4 md:py-6 lg:col-span-3 bg-[#38C4F8]"
              style={this.sidebarStyle}
            >
              <Menu />
            </div>
            <div className="col-span-12 md:col-span-8 lg:col-span-9 pt-7 pb-20 md:pb-7 overflow-y-auto">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

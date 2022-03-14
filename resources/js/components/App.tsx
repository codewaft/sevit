import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "../routes";
import Panel from "./Panel";
import SignIn from "../views/SignIn";
import Broadcasts from "../views/Broadcasts";

export default class App extends Component {
  get authRoutes() {
    return [routes.broadcasts];
  }
  render() {
    return (
      <Router>
        <Routes>
          <Route path={routes.signIn} element={<SignIn />} />
          <Route path="/" element={<Panel />}>
            <Route path={routes.broadcasts} element={<Broadcasts />} />
          </Route>
        </Routes>
      </Router>
    );
  }
}

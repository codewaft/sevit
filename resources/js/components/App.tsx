import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import routes from "../routes";
import SignIn from "../views/SignIn";

export default class App extends Component {
  render() {
    return (
      <Router>
        <Routes>
          <Route path={routes.signIn} element={<SignIn />} />
        </Routes>
      </Router>
    );
  }
}

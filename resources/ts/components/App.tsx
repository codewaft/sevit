import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import routes from "../routes";
import { RootState } from "../store";
import Panel from "./Panel";
import SignIn from "../views/SignIn";
import Broadcasts from "../views/Broadcasts";
import Templates from "../views/Templates";
import Contacts from "../views/Contacts";
import Groups from "../views/Groups/Groups";
import Alert from "./Alert/Alert";

interface Props extends StateProps {}

class App extends Component<Props> {
  get authRoutes() {
    return [routes.broadcasts];
  }

  get alert() {
    const { alert } = this.props;
    return alert && <Alert type={alert.type}>{alert.message}</Alert>;
  }

  render() {
    return (
      <Router>
        <Routes>
          <Route path={routes.signIn} element={<SignIn />} />
          <Route path="/" element={<Panel />}>
            <Route path={routes.broadcasts} element={<Broadcasts />} />
            <Route path={routes.templates} element={<Templates />} />
            <Route path={routes.contacts} element={<Contacts />} />
            <Route path={routes.groups} element={<Groups />} />
          </Route>
        </Routes>
        {this.alert}
      </Router>
    );
  }
}

const mapStateToProps = (state: RootState) => ({
  alert: state.alert.alert,
});

const mapDisptachToProps = {};

type StateProps = ReturnType<typeof mapStateToProps>;

export default connect(mapStateToProps, mapDisptachToProps)(App);

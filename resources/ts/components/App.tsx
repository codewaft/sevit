import React, { Component } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { connect } from "react-redux";
import routes from "../routes";
import { RootState } from "../store/store";
import Panel from "./Panel";
import SignIn from "../views/SignIn/SignIn";
import Broadcasts from "../views/Broadcasts/Broadcasts";
import Templates from "../views/Templates/Templates";
import Contacts from "../views/Contacts/Contacts";
import Groups from "../views/Groups/Groups";
import Alert from "./Alert/Alert";
import ProgressBar from "./ProgressBar/ProgressBar";
import AutoNavigate from "./AutoNavigate/AutoNavigate";
import Modals from "./Modals/Modals";
import Confirm from "./Confirm/Confirm";

interface Props extends StateProps {}

class App extends Component<Props> {
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
            <Route path={routes.templates} element={<Templates />} />
            <Route path={routes.contacts} element={<Contacts />} />
            <Route path={routes.groups} element={<Groups />} />
          </Route>
        </Routes>
        <ProgressBar />
        <Alert />
        <Confirm />
        <Modals />
        <AutoNavigate />
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

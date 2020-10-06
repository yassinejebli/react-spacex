import React from "react";
import { Provider } from "react-redux";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/elements/Header";
import store from "./store";
import History from "./components/containers/History";
import Launches from "./components/containers/Launches";
import SingleLaunchModal from "./components/containers/SingleLaunchModal";

export default function App() {
  return (
    <Provider store={store}>
      <Router>
        <Header />
        <SingleLaunchModal />
        <Route exact path="/" component={History} />
        <Route exact path="/launches" component={Launches} />
      </Router>
    </Provider>
  );
}

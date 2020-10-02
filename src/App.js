import React from "react";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/elements/Header";
import store from "./store";
import History from "./components/containers/History";
import Launches from "./components/containers/Launches";
import SingleLaunchModal from "./components/containers/SingleLaunchModal";

export default function App() {
  return (
    <div id="app">
      <Provider store={store}>
        <GlobalStyle />
        <Router>
          <Header />
          <SingleLaunchModal />
          <Route exact path="/" component={History} />
          <Route exact path="/launches" component={Launches} />
        </Router>
      </Provider>
    </div>
  );
}

const GlobalStyle = createGlobalStyle`
        * {
            @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap');
            font-family: 'Rubik', sans-serif;
        }

`;

import React from "react";
import { Provider } from "react-redux";
import { createGlobalStyle } from "styled-components";
import { HashRouter as Router, Route } from "react-router-dom";
import Header from "./components/containers/Header";
import store from "./store";
import History from "./components/containers/History";

export default function App() {
  return (
    <Provider store={store}>
      <GlobalStyle />
      <Router>
        <Header />
        <Route path="/" component={History} />
      </Router>
    </Provider>
  );
}

const GlobalStyle = createGlobalStyle`
        * {
            @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap');
            font-family: 'Rubik', sans-serif;
        }

`;

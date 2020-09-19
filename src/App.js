import React from 'react'
import styled, {createGlobalStyle} from 'styled-components'
import Logo from "./components/elements/Logo";
import Nav from "./components/elements/Nav";
import {HashRouter as Router} from 'react-router-dom';

export default function App() {
    return <Router>
        <GlobalStyle/>
        <LogoNavWrapper>
            <Logo/>
            <Nav/>
        </LogoNavWrapper>
    </Router>
}

const GlobalStyle = createGlobalStyle`
        * {
            @import url('https://fonts.googleapis.com/css2?family=Rubik:wght@400;500;600&display=swap');
            font-family: 'Rubik', sans-serif;
        }

`

const LogoNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`

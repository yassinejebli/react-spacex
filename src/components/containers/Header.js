import React from 'react'
import Logo from "../elements/Logo";
import Nav from "../elements/Nav";
import styled from "styled-components";

export default function Header() {
    return <LogoNavWrapper>
        <Logo/>
        <Nav/>
    </LogoNavWrapper>
}

const LogoNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`

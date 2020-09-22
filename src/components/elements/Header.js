import React from "react";
import Logo from "./Logo";
import Nav from "./Nav";
import styled from "styled-components";

export default function Header() {
  return (
    <LogoNavWrapper>
      <Logo />
      <Nav />
    </LogoNavWrapper>
  );
}

const LogoNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  margin-bottom: 60px;

  @media (max-width: 600px) {
    flex-direction: column;
  }
`;

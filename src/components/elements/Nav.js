import React from "react";
import styled, { css } from "styled-components";
import { Link, useLocation } from "react-router-dom";

export default function Nav() {
  const location = useLocation();
  return (
    <Wrapper>
      <NavItem selected={location.pathname === "/"} to="/">
        HISTORY
      </NavItem>
      <NavItem selected={location.pathname === "/launches"} to="/launches">
        LAUNCHES
      </NavItem>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  @media (max-width: 600px) {
    margin: 32px auto;
    display: flex;
    justify-content: space-around;
  }
`;

const NavItem = styled(Link)`
  margin-left: 24px;
  cursor: pointer;
  user-select: none;
  text-decoration: none;
  color: #000;

  &:hover {
    color: #005288;
  }
  ${(props) =>
    props.selected &&
    css`
      color: #005288;
    `}
`;

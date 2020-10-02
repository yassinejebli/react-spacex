import React from "react";
import styled from "styled-components";

export default function Loader({ loading }) {
  if (!loading) return null;

  return (
    <div id="loader">
      <Overlay />
      <Wrapper>
        <img src="https://cdn2.iconfinder.com/data/icons/thesquid-ink-40-free-flat-icon-pack/64/space-rocket-512.png" />
        <ul>
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
          <li />
        </ul>
      </Wrapper>
    </div>
  );
}

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Wrapper = styled.div`
  position: fixed;
  left: 50%;
  top: 50%;
  margin: -100px;
  width: 200px;
  height: 200px;
  background: #c7cbd0;
  border-radius: 50%;
  box-shadow: inset -25px 0px 0 0px #9098a1;
  transition: transform 0.2s ease-in-out;
  & > img {
    position: fixed;
    width: 50px;
    height: 30px;
    animation: infinite-spinning 4s infinite;
    animation-timing-function: linear;
    transform-origin: 250% 400%;
  }

  @keyframes infinite-spinning {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }

  & li {
    position: absolute;
    list-style: none;
    background: #737277;
    border-radius: 50%;
  }
  & li:nth-child(1) {
    left: 25px;
    top: 60px;
    width: 50px;
    height: 50px;
    box-shadow: inset 6px -2px 0 0px #414043;
  }
  & li:nth-child(2) {
    left: 150px;
    top: 50px;
    width: 25px;
    height: 25px;
    box-shadow: inset 3px -1px 0 0px #414043;
  }

  & li:nth-child(3) {
    left: 100px;
    top: 150px;
    width: 25px;
    height: 25px;
    box-shadow: inset 3px -1px 0 0px #414043;
  }

  & li:nth-child(4) {
    left: 50px;
    top: 150px;
    width: 12.5px;
    height: 12.5px;
    box-shadow: inset 2.4px -0.8px 0 0px #414043;
  }

  & li:nth-child(5) {
    left: 87.5px;
    top: 16.66666667px;
    width: 12.5px;
    height: 12.5px;
    box-shadow: inset 2.4px -0.8px 0 0px #414043;
  }

  & li:nth-child(6) {
    left: 114.28571429px;
    top: 80px;
    width: 12.5px;
    height: 12.5px;
    box-shadow: inset 2.4px -0.8px 0 0px #414043;
  }

  & li:nth-child(7) {
    left: 181.81818182px;
    top: 100px;
    width: 12.5px;
    height: 12.5px;
    box-shadow: inset 2.4px -0.8px 0 0px #414043;
  }
`;

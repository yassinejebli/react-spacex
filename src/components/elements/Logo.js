import React from "react";
import SpaceXLogo from "../../assets/spacex-logo.svg";
import { Link } from "react-router-dom";

export default function Logo() {
  return (
    <Link to="/">
      <img width={280} src={SpaceXLogo} />
    </Link>
  );
}

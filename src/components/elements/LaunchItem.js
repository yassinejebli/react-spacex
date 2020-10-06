import React from "react";
import styled from "styled-components";

export default function LaunchItem({
  missionName,
  nationality,
  manufacturer,
  type,
  ...props
}) {
  return (
    <Wrapper data-test="launchItemComponent" {...props}>
      <Title data-test="missionName">{missionName}</Title>
      <div>
        <Label>Nationality:</Label> {nationality}
      </div>
      <div>
        <Label>Manufacturer:</Label> {manufacturer}
      </div>
      <div>
        <Label>Type:</Label> {type}
      </div>
    </Wrapper>
  );
}

const Title = styled.h3``;

const Wrapper = styled.div`
  width: 30%;
  margin-bottom: 24px;
  margin-right: 3%;
  padding-bottom: 12px;
  border-bottom: 1px solid #c1c1c1;
  user-select: none;
  cursor: pointer;
  & div {
    margin-top: 6px;
    user-select: none;
  }

  & a {
    color: #005288;
  }

  &:hover > ${Title} {
    color: #005288;
  }

  @media (max-width: 600px) {
    width: 100%;
    margin: 0;
  }
`;

const Label = styled.label`
  color: #364040;
`;

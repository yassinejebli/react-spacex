import React from "react";
import styled from "styled-components";

export default function HistoryItem({ title, date, description, link }) {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <div>
        <Label>Event date:</Label> {date}
      </div>
      <div>
        <Label>Description:</Label> {description}
      </div>
      <div>
        <Label>For more information</Label>{" "}
        <a rel="noreferrer" target="_blank" href={link}>
          click here
        </a>
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

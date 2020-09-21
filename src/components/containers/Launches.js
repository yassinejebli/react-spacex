import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "../elements/Loader";

export default function Launches() {
  const dispatch = useDispatch();
  // const { loading, error, } = useSelector((state) => state);

  React.useEffect(() => {}, []);
  return (
    <>
      {/* <Loader loading={loading} /> */}
      <Wrapper>Launches</Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: wrap;
`;

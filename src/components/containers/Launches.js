import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "../elements/Loader";
import { loadLaunches } from "../../actions/launchesActions";

export default function Launches() {
  const dispatch = useDispatch();
  const { loading, error, launchesItems } = useSelector(
    (state) => state.launches
  );

  React.useEffect(() => {
    dispatch(loadLaunches(2));
  }, []);
  return (
    <>
      <Loader loading={loading} />
      <Wrapper>{JSON.stringify(launchesItems)}</Wrapper>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: wrap;
`;

import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "../elements/Loader";
import { loadLaunches } from "../../actions/launchesActions";
import LaunchItem from "../elements/LaunchItem";
import Pagination from "./Pagination";

export default function Launches() {
  const dispatch = useDispatch();
  const { loading, error, launchesItems } = useSelector(
    (state) => state.launches
  );

  React.useEffect(() => {
    // load 1st page
    dispatch(loadLaunches(1));
  }, []);
  return (
    <>
      <Loader loading={loading} />
      <Wrapper>
        {launchesItems.map((launch) => {
          const payload = launch.rocket?.second_stage?.payloads[0];
          return (
            <LaunchItem
              key={launch.flight_number}
              missionName={launch.mission_name}
              nationality={payload?.nationality}
              manufacturer={payload?.manufacturer}
              type={payload?.payload_type}
            />
          );
        })}
      </Wrapper>
      <Pagination />
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-flow: wrap;
`;

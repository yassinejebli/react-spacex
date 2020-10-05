import React from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import Loader from "../elements/Loader";
import { loadLaunches, openModal } from "../../actions/launchesActions";
import LaunchItem from "../elements/LaunchItem";
import Pagination from "./Pagination";
import LaunchFilters from "./LaunchFilters";
import { launchesSelectors } from "../../selectors/LaunchesSelectors";

export default function Launches() {
  const dispatch = useDispatch();
  const { loading, error, launchesItems } = useSelector(
    launchesSelectors,
    shallowEqual
  );

  React.useEffect(() => {
    // load 1st page
    dispatch(loadLaunches(1));
  }, []);

  const openSingleLaunchModal = (launchId) => {
    dispatch(openModal(launchId));
  };
  return (
    <>
      <Loader loading={loading} />
      <LaunchFilters />
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
              onClick={() => openSingleLaunchModal(launch.flight_number)}
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

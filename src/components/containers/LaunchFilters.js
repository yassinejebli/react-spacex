import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loadLaunches } from "../../actions/launchesActions";
import useDebounce from "../../hooks/useDebounce";
import { formatDate } from "../../utils/dateUtils";
import OrbitDropdownList from "./OrbitDropdownList";

export default function LaunchFilters() {
  const dispatch = useDispatch();
  const [filter, setFilter] = React.useState({
    mission_name: "",
    launch_date: "",
    orbit: "",
  });
  const debouncedFilter = useDebounce(filter);

  React.useEffect(() => {
    // to filter by launch_date_utc we have to set time it's painful for the user as he mostly doesn't know what the exact time a mission was launched
    // I think it's better to filter by "start" and "end" fields
    let filterParam = {};
    if (debouncedFilter.launch_date) {
      const start = new Date(debouncedFilter.launch_date);
      const end = new Date(debouncedFilter.launch_date);
      end.setDate(end.getDate() + 1);
      filterParam = {
        start: formatDate(start),
        end: formatDate(end),
      };
    }

    if (debouncedFilter.mission_name)
      filterParam = {
        ...filterParam,
        mission_name: debouncedFilter.mission_name,
      };

    if (debouncedFilter.orbit)
      filterParam = {
        ...filterParam,
        orbit: debouncedFilter.orbit.toUpperCase(),
      };

    dispatch(loadLaunches(1, filterParam));
  }, [debouncedFilter]);

  const onFieldChange = ({ target }) => {
    setFilter((_filter) => ({ ..._filter, [target.name]: target.value }));
  };

  return (
    <Wrapper>
      <div>
        <div>Filter by mission name</div>
        <Input
          type="text"
          placeholder="FalconSat..."
          value={filter.mission_name}
          name="mission_name"
          onChange={onFieldChange}
        />
      </div>
      <div>
        <div>Filter by launch date</div>
        <Input
          type="date"
          value={filter.launch_date}
          name="launch_date"
          onChange={onFieldChange}
        />
      </div>
      <div>
        <div>Filter by orbit</div>
        <OrbitDropdownList
          name="orbit"
          onChange={onFieldChange}
          value={filter.orbit}
        />
      </div>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  margin-bottom: 16px;
  @media (max-width: 600px) {
    flex-direction: column;
  }
  @media (max-width: 600px) {
    & > * {
      margin-top: 8px;
    }
  }
`;

const Input = styled.input`
  height: 35px;
  width: 230px;
  margin-right: 8px;
`;

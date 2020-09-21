import React from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { loadLaunches } from "../../actions/launchesActions";
import useDebounce from "../../hooks/useDebounce";
import { formatDate } from "../../utils/dateUtils";

export default function LaunchFilters() {
  const dispatch = useDispatch();
  const [filter, setFilter] = React.useState({
    mission_name: "",
    launch_date: null,
  });
  const debouncedFilter = useDebounce(filter);

  React.useEffect(() => {
    // to filter by launch_date_utc we have to set time it's painful for the user as he mostly doesn't know what time the mission was launched
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

    dispatch(loadLaunches(1, filterParam));
  }, [debouncedFilter]);

  const onFieldChange = ({ target }) => {
    setFilter((_filter) => ({ ..._filter, [target.name]: target.value }));
  };

  return (
    <Wrapper>
      <Input
        type="text"
        placeholder="Filter by mission name..."
        value={filter.mission_name}
        name="mission_name"
        onChange={onFieldChange}
      />
      <Input
        type="date"
        value={filter.launch_date}
        name="launch_date"
        onChange={onFieldChange}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
`;

const Input = styled.input`
  padding: 5px;
  width: 230px;
  margin-right: 8px;
`;
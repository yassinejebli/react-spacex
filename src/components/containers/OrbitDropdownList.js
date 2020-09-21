import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { loadOrbits } from "../../actions/orbitActions";

export default function OrbitDropdownList() {
  const dispatch = useDispatch();
  const { loading, orbits } = useSelector((state) => state.orbits);

  React.useEffect(() => {
    dispatch(loadOrbits());
  }, []);
  return (
    <Select>
      {loading && <option>Loading...</option>}
      {orbits.map((o) => (
        <option key={o.id} value={o.id}>
          {o.name}
        </option>
      ))}
    </Select>
  );
}

const Select = styled.select`
  display: flex;
  flex-flow: wrap;
  padding: 8px;
  width: 230px;
  & option {
  }
`;

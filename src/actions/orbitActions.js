export const FETCH_DATA_BEGIN = "FETCH_ORBITS_DATA_BEGIN";
export const FETCH_DATA_SUCCESS = "FETCH_ORBITS_DATA_SUCCESS";
export const FETCH_DATA_FAIL = "FETCH_ORBITS_DATA_FAIL";

export function loadOrbits() {
  return {
    type: FETCH_DATA_BEGIN,
  };
}

export const FETCH_DATA_BEGIN = "FETCH_LAUNCHES_DATA_BEGIN";
export const FETCH_DATA_SUCCESS = "FETCH_LAUNCHES_DATA_SUCCESS";
export const FETCH_DATA_FAIL = "FETCH_LAUNCHES_DATA_FAIL";

export function loadLaunches(currentPage, filters) {
  return {
    type: FETCH_DATA_BEGIN,
    payload: {
      currentPage,
      filters,
    },
  };
}

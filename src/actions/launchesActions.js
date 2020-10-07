export const FETCH_DATA_BEGIN = "FETCH_LAUNCHES_DATA_BEGIN";
export const FETCH_DATA_SUCCESS = "FETCH_LAUNCHES_DATA_SUCCESS";
export const FETCH_DATA_FAIL = "FETCH_LAUNCHES_DATA_FAIL";

export const FETCH_SINGLE_DATA_BEGIN = "FETCH_SINGLE_LAUNCHES_DATA_BEGIN";
export const FETCH_SINGLE_DATA_SUCCESS = "FETCH_SINGLE_LAUNCHES_DATA_SUCCESS";
export const FETCH_SINGLE_DATA_FAIL = "FETCH_SINGLE_LAUNCHES_DATA_FAIL";

export const OPEN_MODAL = "OPEN_LAUNCHES_MODAL";
export const CLOSE_MODAL = "CLOSE_LAUNCHES_MODAL";

export function loadLaunches(currentPage, filters) {
  return {
    type: FETCH_DATA_BEGIN,
    payload: {
      currentPage,
      filters,
    },
  };
}

export function openModal(launchId) {
  return {
    type: OPEN_MODAL,
    payload: {
      launchId,
    },
  };
}

export function closeModal() {
  return {
    type: CLOSE_MODAL,
  };
}

export function setLaunchItems(data) {
  return {
    type: FETCH_DATA_SUCCESS,
    payload: data,
  };
}

export function setLaunchError(error) {
  return {
    type: FETCH_SINGLE_DATA_FAIL,
    payload: error,
  };
}

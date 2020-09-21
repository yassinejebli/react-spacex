export const FETCH_DATA_BEGIN = "FETCH_HISTORY_DATA_BEGIN";
export const FETCH_DATA_SUCCESS = "FETCH_HISTORY_DATA_SUCCESS";
export const FETCH_DATA_FAIL = "FETCH_HISTORY_DATA_FAIL";

export function loadHistory() {
  return {
    type: FETCH_DATA_BEGIN,
  };
}

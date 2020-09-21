import * as Actions from "../actions/launchesActions";

export const launchesState = {
  launchesItems: [],
  loading: false,
  error: null,
  meta: {
    currentPage: 1,
    perPage: 5,
    totalItems: null,
  },
};

export function launchesReducer(state = launchesState, action) {
  switch (action.type) {
    case Actions.FETCH_DATA_BEGIN:
      return { ...state, loading: true };
    case Actions.FETCH_DATA_SUCCESS:
      return {
        ...state,
        launchesItems: action.payload.data,
        meta: {
          currentPage: action.payload.currentPage,
          perPage: 5, // Always 5 items per page for now, I can parameterize it if that's needed
          totalItems: action.payload.currentPage,
        },
        loading: false,
      };
    case Actions.FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

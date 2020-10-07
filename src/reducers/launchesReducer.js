import * as Actions from "../actions/launchesActions";

/**
 * @type LaunchState
 */
export const INITIAL_STATE = {
  launchesItems: [],
  showModal: false,
  selectedLaunch: null,
  loading: false,
  error: null,
  filters: {},
  meta: {
    currentPage: 1,
    perPage: 6,
    totalItems: null,
  },
};

// TODO: should create SET_FILTERS action, it doesn't make sense to set filters after successful fetch
export function launchesReducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case Actions.FETCH_DATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case Actions.FETCH_DATA_SUCCESS:
      return {
        ...state,
        loading: false,
        launchesItems: action.payload.data,
        meta: {
          currentPage: action.payload.currentPage,
          perPage: 6, // Always 6 items per page for now, I can parameterize it if that's needed
          totalItems: action.payload.totalItems,
        }, // Preserve old filters
        filters: {
          ...state.filters,
          ...action.payload.filters,
        },
      };
    case Actions.FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // TODO: I think I should move these actions below to a new single launch specific reducer
    case Actions.FETCH_SINGLE_DATA_BEGIN:
      return {
        ...state,
        loading: true,
      };
    case Actions.FETCH_SINGLE_DATA_SUCCESS:
      return {
        ...state,
        selectedLaunch: action.payload,
        loading: false,
      };
    case Actions.FETCH_SINGLE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case Actions.OPEN_MODAL:
      return {
        ...state,
        showModal: true,
      };
    case Actions.CLOSE_MODAL:
      return {
        ...state,
        showModal: false,
        selectedLaunch: null,
      };
    default:
      return state;
  }
}

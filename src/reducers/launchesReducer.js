import * as Actions from "../actions/launchesActions";

export const launchesState = {
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
          perPage: 6, // Always 6 items per page for now, I can parameterize it if that's needed
          totalItems: action.payload.totalItems,
        }, // Preserve old filters
        filters: { ...state.filters, ...action.payload.filters },
        loading: false,
      };
    case Actions.FETCH_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    // TODO: I think I should move these actions below to a new single launch specific reducer
    case Actions.FETCH_SINGLE_DATA_BEGIN:
      return { ...state, loading: true };
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

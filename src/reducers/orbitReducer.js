import * as Actions from "../actions/orbitActions";

export const orbitsState = {
  orbits: [],
  loading: false,
  error: null,
};

export function orbitReducer(state = orbitsState, action) {
  switch (action.type) {
    case Actions.FETCH_DATA_BEGIN:
      return { ...state, loading: true };
    case Actions.FETCH_DATA_SUCCESS:
      return { ...state, orbits: action.payload, loading: false };
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

import * as Actions from "../actions/shareLaunchDataActions";

export const shareLaunchDataState = {
  response: null,
  loading: false,
  error: null,
};

export function shareLaunchDataReducer(state = shareLaunchDataState, action) {
  switch (action.type) {
    case Actions.SHARE_DATA_BEGIN:
      return { ...state, loading: true };
    case Actions.SHARE_DATA_SUCCESS:
      return { ...state, orbits: action.payload, loading: false };
    case Actions.SHARE_DATA_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
}

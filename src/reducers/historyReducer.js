import * as Actions from "../actions/historyActions";


export const historyState  = {
    historyItems: [],
    loading: false
};

export function historyReducer(state = historyState, action){
    switch (action.type) {
        case Actions.FETCH_DATA_BEGIN:
            return {...state, loading: true};
        case Actions.FETCH_DATA_SUCCESS:
            return { ...state, historyItems: action.payload, loading: false }
        default:
            return state;
    }
}

import { put, takeLatest, all } from 'redux-saga/effects';
import * as Actions from "../actions/historyActions";

function* fetchHistory() {
    const data = yield fetch('https://api.spacexdata.com/v3/history')
        .then(response => response.json());
    yield put({ type: Actions.FETCH_DATA_SUCCESS, payload: data });
}

function* loadHistory() {
    yield takeLatest(Actions.FETCH_DATA_BEGIN, fetchHistory)
}

export default function* rootSaga() {
    yield all([
        loadHistory(),
    ]);
}

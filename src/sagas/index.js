import { put, takeLatest, all } from "redux-saga/effects";
import * as Actions from "../actions/historyActions";

function* fetchHistory() {
  try {
    const response = yield fetch("https://api.spacexdata.com/v3/history");
    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();
      yield put({ type: Actions.FETCH_DATA_SUCCESS, payload: data });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({ type: Actions.FETCH_DATA_FAIL, payload: [], loading: false });
  }
}

function* loadHistory() {
  yield takeLatest(Actions.FETCH_DATA_BEGIN, fetchHistory);
}

export default function* rootSaga() {
  yield all([loadHistory()]);
}

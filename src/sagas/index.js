import { put, takeLatest, all, select } from "redux-saga/effects";
import * as HistoryActions from "../actions/historyActions";
import * as LaunchesActions from "../actions/launchesActions";

// ---------------------------------------History

function* fetchHistory() {
  try {
    const response = yield fetch("https://api.spacexdata.com/v3/history");
    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();
      yield put({ type: HistoryActions.FETCH_DATA_SUCCESS, payload: data });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({
      type: HistoryActions.FETCH_DATA_FAIL,
      loading: false,
      error,
    });
  }
}

function* loadHistory() {
  yield takeLatest(HistoryActions.FETCH_DATA_BEGIN, fetchHistory);
}

// ---------------------------------------Launches

function* fetchLaunches() {
  const { meta } = yield select((state) => state.launches);
  const limit = meta.perPage;
  const offset = (meta.currentPage - 1) * limit;
  try {
    const response = yield fetch(
      `https://api.spacexdata.com/v3/launches?offset=${offset}&limit=${limit}`
    );
    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();
      yield put({
        type: LaunchesActions.FETCH_DATA_SUCCESS,
        payload: {
          data,
          totalItems: 100, // TODO: total items needed
          currentPage: meta.currentPage + 1,
        },
      });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({
      type: LaunchesActions.FETCH_DATA_FAIL,
      loading: false,
      error,
    });
  }
}

function* loadLaunches() {
  yield takeLatest(LaunchesActions.FETCH_DATA_BEGIN, fetchLaunches);
}

export default function* rootSaga() {
  yield all([loadHistory(), loadLaunches()]);
}

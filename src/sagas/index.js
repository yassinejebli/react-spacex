import { put, takeLatest, all, select } from "redux-saga/effects";
import * as HistoryActions from "../actions/historyActions";
import * as LaunchesActions from "../actions/launchesActions";

// ---------------------------------------History

function* fetchHistory() {
  try {
    // Fetch only the needed fields
    const filters = "id,title,event_date_utc,details,links";
    const response = yield fetch(
      `https://api.spacexdata.com/v3/history?filter=${filters}`
    );
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

function* fetchLaunches({ payload: { currentPage, missionName } }) {
  const { meta } = yield select((state) => state.launches);
  const limit = meta.perPage;
  const offset = (currentPage - 1) * limit;
  // Fetch only the needed fields
  const filters = "mission_name,flight_number,rocket/second_stage/payloads";
  try {
    const response = yield fetch(
      `https://api.spacexdata.com/v3/launches?mission_name=${missionName}&offset=${offset}&limit=${limit}&filter=${filters}`
    );
    const totalItems = response.headers.get("spacex-api-count");
    if (response.status >= 200 && response.status < 300) {
      const data = yield response.json();
      yield put({
        type: LaunchesActions.FETCH_DATA_SUCCESS,
        payload: {
          data,
          totalItems,
          currentPage,
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

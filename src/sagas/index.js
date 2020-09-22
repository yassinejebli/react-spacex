import { put, takeLatest, all, select } from "redux-saga/effects";
import * as HistoryActions from "../actions/historyActions";
import * as LaunchesActions from "../actions/launchesActions";
import * as OrbitActions from "../actions/orbitActions";

// ---------------------------------------History

function* fetchHistory() {
  try {
    // Fetch only the needed fields
    const fieldsToFetch = "id,title,event_date_utc,details,links";
    const response = yield fetch(
      `https://api.spacexdata.com/v3/history?filter=${fieldsToFetch}`
    );
    if (response.ok) {
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

function* fetchLaunches({ payload: { currentPage, filters } }) {
  const { meta } = yield select((state) => state.launches);
  const limit = meta.perPage;
  const offset = (currentPage - 1) * limit;
  // Fetch only the needed fields
  const fieldsToFetch =
    "mission_name,flight_number,rocket/second_stage/payloads";
  try {
    const response = yield fetch(
      `https://api.spacexdata.com/v3/launches?${new URLSearchParams(
        filters
      ).toString()}&offset=${offset}&limit=${limit}&filter=${fieldsToFetch}`
    );
    const totalItems = response.headers.get("spacex-api-count");
    if (response.ok) {
      const data = yield response.json();
      yield put({
        type: LaunchesActions.FETCH_DATA_SUCCESS,
        payload: {
          data,
          totalItems,
          currentPage,
          filters,
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

// --------------------------------------- Single Launch

function* openModalAndfetchSingleLaunch({ payload: { launchId } }) {
  const fieldsToFetch =
    "mission_name,launch_year,launch_date_utc,launch_success,details,links,flight_number,rocket";
  try {
    yield put({
      type: LaunchesActions.FETCH_SINGLE_DATA_BEGIN,
    });
    const response = yield fetch(
      `https://api.spacexdata.com/v3/launches/${launchId}?filter=${fieldsToFetch}`
    );
    if (response.ok) {
      const data = yield response.json();
      yield put({
        type: LaunchesActions.FETCH_SINGLE_DATA_SUCCESS,
        payload: data,
      });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({
      type: LaunchesActions.FETCH_SINGLE_DATA_FAIL,
      loading: false,
      error,
    });
  }
}

function* loadSingleLaunch() {
  yield takeLatest(LaunchesActions.OPEN_MODAL, openModalAndfetchSingleLaunch);
}

// ---------------------------------------Orbits

function* fetchAndReshapeOrbitsData() {
  try {
    // Fetch only the needed fields
    const fieldsToFetch = "rocket_id,payload_weights";
    const response = yield fetch(
      `https://api.spacexdata.com/v3/rockets?filter=${fieldsToFetch}`
    );
    if (response.ok) {
      const data = yield response.json();

      // Reshape data, maybe I have to create a new action for reshaping orbit data :/
      const orbits = data.reduce((acc, curr) => {
        curr.payload_weights.forEach((orb) => {
          // Add orbit only if it doesn't exist in the accumulator
          if (!acc.find((_orb) => _orb.id === orb.id))
            acc.push({
              id: orb.id,
              name: orb.name,
            });
        });
        return acc;
      }, []);
      yield put({ type: OrbitActions.FETCH_DATA_SUCCESS, payload: orbits });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({
      type: OrbitActions.FETCH_DATA_FAIL,
      loading: false,
      error,
    });
  }
}

function* loadOrbits() {
  yield takeLatest(OrbitActions.FETCH_DATA_BEGIN, fetchAndReshapeOrbitsData);
}

export default function* rootSaga() {
  yield all([loadHistory(), loadLaunches(), loadSingleLaunch(), loadOrbits()]);
}

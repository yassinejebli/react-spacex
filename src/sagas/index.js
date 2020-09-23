import { put, takeLatest, all, select, call } from "redux-saga/effects";
import * as HistoryActions from "../actions/historyActions";
import * as LaunchesActions from "../actions/launchesActions";
import * as OrbitActions from "../actions/orbitActions";
import * as ShareLaunchDataActions from "../actions/shareLaunchDataActions";

// ---------------------------------------History

function* fetchHistory() {
  try {
    // Fetch only the needed fields
    const fieldsToFetch = "id,title,event_date_utc,details,links";
    const response = yield call(
      fetch,
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
    const response = yield call(
      fetch,
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
    const response = yield call(
      fetch,
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
    const response = yield call(
      fetch,
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

// --------------------------------------- Share launch data

function* submitLaunchData({ payload: { launchData } }) {
  try {
    // this post request will return an error because someimagenaryendpoint.com/share doesn't exist on Web
    const response = yield fetch("https://someimagenaryendpoint.com/share", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launchData),
    });
    if (response.ok) {
      const data = yield response.json();
      yield put({
        type: ShareLaunchDataActions.SHARE_DATA_SUCCESS,
        payload: data,
      });
    } else {
      throw response;
    }
  } catch (error) {
    yield put({
      type: ShareLaunchDataActions.SHARE_DATA_FAIL,
      loading: false,
      error,
    });
  }
}

function* shareLaunchData() {
  yield takeLatest(ShareLaunchDataActions.SHARE_DATA_BEGIN, submitLaunchData);
}

export default function* rootSaga() {
  yield all([
    loadHistory(),
    loadLaunches(),
    loadSingleLaunch(),
    loadOrbits(),
    shareLaunchData(),
  ]);
}

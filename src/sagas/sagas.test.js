import { runSaga } from "redux-saga";
import { takeLatest } from "redux-saga/effects";
import { fetchHistory, loadHistory } from "./";
import * as HistoryActions from "../actions/historyActions";
import * as API from "../api";
import { expectSaga } from "redux-saga-test-plan";
import { historyReducer } from "../reducers/historyReducer";

describe("History saga", () => {
  const genObject = loadHistory();

  it("should wait for FETCH_HISTORY_DATA_BEGIN action then call fetchHistory", () => {
    expect(genObject.next().value).toEqual(
      takeLatest(HistoryActions.FETCH_DATA_BEGIN, fetchHistory)
    );
  });

  it("should fetch launch history items successfully", async () => {
    const historyItems = ["item1", "item2"];
    const expectedActions = [
      {
        type: "FETCH_HISTORY_DATA_SUCCESS",
        payload: historyItems,
      },
    ];
    API.fetchLaunchesHistory = jest.fn(() => Promise.resolve(historyItems));
    const dispatchedActions = [];
    const mockedStore = {
      getState: () => ({
        historyItems: [],
        error: null,
      }),
      dispatch: (action) => dispatchedActions.push(action),
    };

    await runSaga(mockedStore, fetchHistory);
    expect(API.fetchLaunchesHistory).toHaveBeenCalled();
    expect(dispatchedActions).toEqual(expectedActions);
  });

  it("should throw an error when trying to fetch data", async () => {
    const error = new Error("Cannot fetch data");
    const expectedActions = [
      {
        type: "FETCH_HISTORY_DATA_FAIL",
        payload: error,
      },
    ];
    API.fetchLaunchesHistory = jest.fn(() => Promise.reject(error));
    const dispatchedActions = [];
    const mockedStore = {
      getState: () => ({
        historyItems: [],
        error: null,
      }),
      dispatch: (action) => dispatchedActions.push(action),
    };

    await runSaga(mockedStore, fetchHistory);
    expect(API.fetchLaunchesHistory).toHaveBeenCalled();
    expect(dispatchedActions).toEqual(expectedActions);
  });

  // redux-saga-test-plan
  it("handles history reducer and store state - success", () => {
    const mockedHistoryData = [
      {
        id: "mission1",
        missionName: "Mission 1",
      },
    ];
    API.fetchLaunchesHistory = jest.fn(() =>
      Promise.resolve(mockedHistoryData)
    );
    const expectedState = {
      loading: false,
      error: null,
      historyItems: mockedHistoryData,
    };
    return expectSaga(fetchHistory)
      .withReducer(historyReducer)
      .hasFinalState(expectedState)
      .run();
  });

  // redux-saga-test-plan
  it("handles history reducer and store state - failure", () => {
    const error = new Error("Cannot fetch data");
    API.fetchLaunchesHistory = jest.fn(() => Promise.reject(error));
    const expectedState = {
      loading: false,
      error: error,
      historyItems: [],
    };
    return expectSaga(fetchHistory)
      .withReducer(historyReducer)
      .hasFinalState(expectedState)
      .run();
  });
});

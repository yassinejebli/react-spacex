import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";
import { launchesReducer } from "./launchesReducer";

export default combineReducers({
  history: historyReducer,
  launches: launchesReducer,
});

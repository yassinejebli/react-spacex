import { combineReducers } from "redux";
import { historyReducer } from "./historyReducer";
import { launchesReducer } from "./launchesReducer";
import { orbitReducer } from "./orbitReducer";

export default combineReducers({
  history: historyReducer,
  launches: launchesReducer,
  orbits: orbitReducer,
});

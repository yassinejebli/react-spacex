import { createSelector } from "reselect";

const _launches = (state) => state.launches;

export const launchesSelectors = createSelector(
  _launches,
  (launches) => launches
);

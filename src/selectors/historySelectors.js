import { createSelector } from "reselect";

const _history = (state) => state.history;

export const historySelectors = createSelector(_history, (history) => history);

import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { historyReducer } from "../reducers/historyReducer";
import rootSaga from "../sagas";

const sagaMiddleware = createSagaMiddleware();
const store = createStore(historyReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);

export default store;

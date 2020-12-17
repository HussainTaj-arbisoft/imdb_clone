import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const middlewares = [thunk];
const enhancers = applyMiddleware(...middlewares);
const initialState = {};

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(enhancers)
);

export default store;

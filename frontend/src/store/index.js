import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import rootReducer from './reducers'


const middlewares = [thunk];
const enhancers = applyMiddleware(...middlewares);
const initialState = {};

const store = createStore(rootReducer, initialState, enhancers);

export default store;
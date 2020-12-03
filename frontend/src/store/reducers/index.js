import { combineReducers } from 'redux'
import movieReducer from './movieReducer'
import celebrityReducer from './celebrityReducer'
import authReducer from './authReducer';

const rootReducer = combineReducers({
    movies: movieReducer,
    celebrities: celebrityReducer,
    auth: authReducer,
});

export default rootReducer;
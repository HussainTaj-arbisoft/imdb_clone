import { combineReducers } from 'redux'
import movieReducer from './movieReducer'
import celebrityReducer from './celebrityReducer'

const rootReducer = combineReducers({
    movies: movieReducer,
    celebrities: celebrityReducer
});

export default rootReducer;
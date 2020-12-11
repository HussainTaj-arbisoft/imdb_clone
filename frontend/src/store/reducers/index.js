import { combineReducers } from 'redux'
import movieReducer from './movieReducer'
import celebrityReducer from './celebrityReducer'
import authReducer from './authReducer';
import chatReducer from './chatReducer'

const rootReducer = combineReducers({
    movies: movieReducer,
    celebrities: celebrityReducer,
    auth: authReducer,
    chat: chatReducer
});

export default rootReducer;
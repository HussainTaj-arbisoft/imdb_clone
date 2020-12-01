import * as types from './types';

export const listPeekMovies = () => dispatch => {
    dispatch({
        type: types.MOVIE_PEEK_LIST,
        payload: {} // TODO: 
    })
}

export const listRecommendedMovies = () => dispatch => {
    dispatch({
        type: types.MOVIE_RECOMMENDTION_LIST,
        payload: {} // TODO:
    })
}

export const listFanFavoriteMovies = () => dispatch => {
    dispatch({
        type: types.MOVIE_FAN_FAVORITE_LIST,
        payload: {} // TODO:
    })
}
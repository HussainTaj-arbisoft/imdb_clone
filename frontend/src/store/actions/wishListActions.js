import axios from 'axios'
import * as types from './types';
import { MOVIE_SERVER_API_URL } from '../hosts'
import { createErrorResponseAction } from './utilities'


const WISH_LIST_URL = `${MOVIE_SERVER_API_URL}/wishlist/`


const getWishListRequest = () => {
    return {
        type: types.MOVIE_WISH_LIST_GET_REQUEST,
        payload: {
            status: 'loading'
        }
    }
}

export const getWishList = () => dispatch => {
    dispatch(getWishListRequest());
    axios.get(WISH_LIST_URL).then(
        (response) => {
            dispatch({
                type: types.MOVIE_WISH_LIST_GET_RESPONSE,
                payload: {
                    items: response.data,
                    status: 'loaded'
                }
            })
        }
    ).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.MOVIE_WISH_LIST_GET_RESPONSE, response));
    });
}

const wishListAddMovieRequest = () => {
    return {
        type: types.MOVIE_WISH_LIST_ADD_REQUEST,
        payload: {
            status: 'loading'
        }
    }
}

export const wishListAddMovie = (movieId, userId) => dispatch => {
    dispatch(wishListAddMovieRequest());
    axios.post(WISH_LIST_URL, { movie: movieId, user: userId }).then(
        (response) => {
            dispatch({
                type: types.MOVIE_WISH_LIST_ADD_RESPONSE,
                payload: {
                    added: response.data.results,
                    status: 'loaded'
                }
            })
        }
    ).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.MOVIE_WISH_LIST_ADD_RESPONSE, response));
    });
}

const wishListRemoveMovieRequest = () => {
    return {
        type: types.MOVIE_WISH_LIST_REMOVE_REQUEST,
        payload: {
            status: 'loading'
        }
    }
}

export const wishListRemoveMovie = (wishListId) => dispatch => {
    dispatch(wishListRemoveMovieRequest());
    axios.delete(`${WISH_LIST_URL}${wishListId}/`).then(
        (response) => {
            dispatch({
                type: types.MOVIE_WISH_LIST_REMOVE_RESPONSE,
                payload: {
                    removed: response.data.results,
                    status: 'loaded'
                }
            })
        }
    ).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.MOVIE_WISH_LIST_REMOVE_RESPONSE, response));
    });
}
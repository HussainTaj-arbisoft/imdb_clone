import axios from 'axios'
import * as types from './types';
import { MOVIE_SERVER_API_URL } from '../hosts'
import ReactPlayer from 'react-player/lazy';

const MOVIE_PEEK_LIST_LIMIT = 10
const MOVIE_PEEK_LIST_URL = `${MOVIE_SERVER_API_URL}/?limit=${MOVIE_PEEK_LIST_LIMIT}`
const MOVIE_DETAIL_URL = MOVIE_SERVER_API_URL;

const listPeekMoviesRequest = () => {
    return {
        type: types.MOVIE_PEEK_LIST_REQUEST,
        payload: {
            status: 'loading'
        }
    }
}

export const listPeekMovies = () => dispatch => {
    dispatch(listPeekMoviesRequest());
    axios.get(MOVIE_PEEK_LIST_URL).then(
        (response) => {
            dispatch({
                type: types.MOVIE_PEEK_LIST_RESPONSE,
                payload: {
                    peeks: response.data.results,
                    nextPeeksUrl: response.data.next,
                    status: 'loaded'
                }
            })
        }
    ).catch(({ response }) => {
        dispatch({
            type: types.MOVIE_PEEK_LIST_RESPONSE,
            payload: {
                peeks: [],
                status: 'error',
                statusCode: response.status,
                statusText: response.statusText,
                errorMessage: response.data.detail
            }
        })
    });
}

const detailMovieRequest = (movie_id) => {
    return {
        type: types.MOVIE_DETAIL_REQUEST,
        payload: {
            status: 'loading',
            movie_id: movie_id
        }
    }
}

export const detailMovie = (movie_id) => dispatch => {
    dispatch(detailMovieRequest(movie_id));
    let detailMovieUrl = `${MOVIE_DETAIL_URL}/${movie_id}`;
    let detailMovieCrewUrl = `${MOVIE_DETAIL_URL}/crew/${movie_id}`;
    Promise.all([
        axios.get(detailMovieUrl),
        axios.get(detailMovieCrewUrl)
    ]).then(
        ([responseMovie, responseCrew]) => {
            console.log("REPONSE")
            console.log(responseCrew)
            dispatch({
                type: types.MOVIE_DETAIL_RESPONSE,
                payload: {
                    movieData: responseMovie.data,
                    crewData: responseCrew.data,
                    status: "loaded"
                }
            })
        }
    ).catch((response) => {
        console.log(response);
        response = response.response;
        dispatch({
            type: types.MOVIE_DETAIL_RESPONSE,
            payload: {
                status: "error",
                statusCode: response.status,
                statusText: response.statusText,
                errorMessage: response.data.detail
            }
        })
    });
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
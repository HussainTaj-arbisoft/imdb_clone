import axios from 'axios'
import * as types from './types';
import { MOVIE_SERVER_API_URL } from '../hosts'

const MOVIE_PEEK_LIST_LIMIT = 10;
const MOVIE_PEEK_LIST_URL = `${MOVIE_SERVER_API_URL}/?limit=${MOVIE_PEEK_LIST_LIMIT}`;
const MOVIE_DETAIL_URL = MOVIE_SERVER_API_URL;
const MOVIE_RATING_URL = `${MOVIE_SERVER_API_URL}/ratings/`;
const MOVIE_REVIEW_URL = `${MOVIE_SERVER_API_URL}/reviews/`;
const MOVIE_SEARCH_URL = `${MOVIE_SERVER_API_URL}/search/`;
const MOVIE_SEARCH_RESULT_LIMIT = 10;


const createErrorResponseAction = (type, response) => {
    return {
        type,
        payload: {
            status: 'error',
            statusCode: response?.status,
            statusText: response?.statusText,
            errorMessage: response?.data?.detail
        }
    };
}

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
        dispatch(createErrorResponseAction(types.MOVIE_PEEK_LIST_RESPONSE, response));
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
            dispatch({
                type: types.MOVIE_DETAIL_RESPONSE,
                payload: {
                    movieData: responseMovie.data,
                    crewData: responseCrew.data,
                    status: "loaded"
                }
            })
        }
    ).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.MOVIE_DETAIL_RESPONSE, response));
    });
}

const rateMovieRequest = () => {
    return {
        type: types.MOVIE_USER_RATING_RATE_REQUEST,
        payload: {
            status: "loading"
        }
    }
};

export const rateMovie = (movie_id, user_id, rating) => dispatch => {
    dispatch(rateMovieRequest());
    axios.post(MOVIE_RATING_URL, {
        movie: movie_id,
        user: user_id,
        rating: rating,
    }).then((response) => {
        dispatch({
            type: types.MOVIE_USER_RATING_RATE_RESPONSE,
            payload: {
                status: "loaded",
                ...response.data
            }
        });
    }).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.MOVIE_USER_RATING_RATE_RESPONSE, response));
    });
}

const getUserMovieRatingRequest = () => {
    return {
        type: types.MOVIE_USER_RATING_RETRIEVE_REQUEST,
        payload: {
            status: "loading"
        }
    }
}

export const getUserMovieRating = (movie_id) => dispatch => {
    dispatch(getUserMovieRatingRequest());
    let url = `${MOVIE_RATING_URL}user_movie_rating/${movie_id}/`;
    axios.get(url).then((response) => {
        dispatch({
            type: types.MOVIE_USER_RATING_RETRIEVE_RESPONSE,
            payload: {
                status: "loaded",
                ...response.data
            }
        });
    }).catch((response) => {
        dispatch(createErrorResponseAction(types.MOVIE_USER_RATING_RETRIEVE_RESPONSE, response));
    })
}



const getUserMovieReviewRequest = () => {
    return {
        type: types.MOVIE_USER_REVIEW_RETRIEVE_REQUEST,
        payload: {
            status: "loading"
        }
    }
}

export const getUserMovieReview = (movie_id) => dispatch => {
    dispatch(getUserMovieReviewRequest());
    let url = `${MOVIE_REVIEW_URL}user_movie_review/${movie_id}/`;
    axios.get(url).then((response) => {
        dispatch({
            type: types.MOVIE_USER_REVIEW_RETRIEVE_RESPONSE,
            payload: {
                status: "loaded",
                ...response.data
            }
        });
    }).catch((response) => {
        dispatch(createErrorResponseAction(types.MOVIE_USER_REVIEW_RETRIEVE_RESPONSE, response));
    })
}


const reviewMovieRequest = () => {
    return {
        type: types.MOVIE_USER_REVIEW_REQUEST,
        payload: {
            status: "loading"
        }
    };
};

export const reviewMovie = (movie_id, user_id, review) => dispatch => {
    dispatch(reviewMovieRequest());
    axios.post(MOVIE_REVIEW_URL, {
        movie: movie_id,
        user: user_id,
        review: review,
    }).then((response) => {
        dispatch({
            type: types.MOVIE_USER_REVIEW_RESPONSE,
            payload: {
                status: "loaded",
                ...response.data
            }
        });
    }).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.MOVIE_USER_REVIEW_RESPONSE, response));
    });
}


const searchMovieRequest = () => {
    return {
        type: types.MOVIE_SEARCH_REQUEST,
        payload: {
            status: "loading"
        }
    };
}

export const searchMovie = (searchString) => dispatch => {
    dispatch(searchMovieRequest());
    let search_url = `${MOVIE_SEARCH_URL}/${searchString}/?limit=${MOVIE_SEARCH_RESULT_LIMIT}`

    axios.get(search_url).then((response) => {
        dispatch({
            type: types.MOVIE_SEARCH_RESPONSE,
            payload: {
                status: "loaded",
                movies: response.data.results
            }
        });
    }).catch(({ response }) => {
        dispatch(createErrorResponseAction(types.MOVIE_SEARCH_RESPONSE, response));
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
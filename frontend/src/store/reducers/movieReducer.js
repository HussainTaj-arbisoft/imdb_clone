import * as types from './../actions/types'


const initialState = {
    peeks: [],
    recommendations: [],
    fanFavorties: [],
    detail: {},
    detailCurrentUserRating: {},
    detailCurrentUserReview: {},
    search: {}
};


const movieReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.MOVIE_PEEK_LIST_REQUEST:
        case types.MOVIE_PEEK_LIST_RESPONSE:
            return Object.assign({}, state, {
                peeks: {
                    ...action.payload
                }
            });
        case types.MOVIE_DETAIL_REQUEST:
        case types.MOVIE_DETAIL_RESPONSE:
            return Object.assign({}, state, {
                detail: {
                    ...action.payload
                }
            });
        case types.MOVIE_USER_RATING_RETRIEVE_REQUEST:
        case types.MOVIE_USER_RATING_RETRIEVE_RESPONSE:
        case types.MOVIE_USER_RATING_RATE_REQUEST:
        case types.MOVIE_USER_RATING_RATE_RESPONSE:
            return Object.assign({}, state, {
                detailCurrentUserRating: {
                    ...action.payload
                }
            });
        case types.MOVIE_USER_REVIEW_RETRIEVE_REQUEST:
        case types.MOVIE_USER_REVIEW_RETRIEVE_RESPONSE:
        case types.MOVIE_USER_REVIEW_REQUEST:
        case types.MOVIE_USER_REVIEW_RESPONSE:
            return Object.assign({}, state, {
                detailCurrentUserReview: {
                    ...action.payload
                }
            });
        case types.MOVIE_SEARCH_REQUEST:
        case types.MOVIE_SEARCH_RESPONSE:
            return Object.assign({}, state, {
                search: {
                    ...action.payload
                }
            });

        case types.MOVIE_FAN_FAVORITE_LIST_REQUEST:
        case types.MOVIE_FAN_FAVORITE_LIST_RESPONSE:
            return Object.assign({}, state, {
                fanFavorites: {
                    ...action.payload
                }
            });

        case types.MOVIE_RECOMMENDTION_LIST_REQUEST:
        case types.MOVIE_RECOMMENDTION_LIST_RESPONSE:
            return Object.assign({}, state, {
                recommendations: {
                    ...action.payload
                }
            });

        default:
            return state;
    }
};

export default movieReducer;
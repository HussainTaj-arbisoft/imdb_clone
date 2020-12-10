import * as types from './../actions/types'
const dummyData = [
    {
        id: 1,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 1',
        subTitle: 'Watch the kin take flight.',
        rating: 1,
        trailerDuration: '00:14',
    },
    {
        id: 2,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 2',
        subTitle: 'Whatever baby master demands.',
        rating: 6.6,
        trailerDuration: '00:14',
    },
    {
        id: 3,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 3',
        subTitle: 'Watch the trailer.',
        rating: 7.6,
        trailerDuration: '00:14',
    },
    {
        id: 4,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 4',
        subTitle: 'Watch the kin take flight.',
        rating: 9,
        trailerDuration: '00:14',
    },
    {
        id: 5,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 5',
        subTitle: 'Whatever baby master demands.',
        rating: 10,
        trailerDuration: '00:14',
    },
    {
        id: 6,
        posterUrl: 'https://upload.wikimedia.org/wikipedia/en/0/0e/The_Boss_Baby_poster.jpg',
        billboardImageUrl: 'https://uiconstock.com/wp-content/uploads/2016/11/maxresdefault-4.jpg',
        title: 'Baby Boss 6',
        subTitle: 'Watch the trailer.',
        rating: 3,
        trailerDuration: '00:14',
    }
];


const initialState = {
    peeks: [],
    recommendations: [...dummyData],
    fanFavorties: [...dummyData],
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
        default:
            return state;
    }
};

export default movieReducer;
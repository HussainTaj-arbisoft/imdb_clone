import * as types from '../actions/types';


const initialState = {
    added: { status: 'loaded' },
    removed: { status: 'loaded' },
    list: { status: 'loaded' }
};


const wishListReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.MOVIE_WISH_LIST_ADD_REQUEST:
        case types.MOVIE_WISH_LIST_ADD_RESPONSE:
            return Object.assign({}, state, {
                added: {
                    ...action.payload
                }
            })
        case types.MOVIE_WISH_LIST_GET_REQUEST:
        case types.MOVIE_WISH_LIST_GET_RESPONSE:
            return Object.assign({}, state, {
                list: {
                    ...action.payload
                }
            })
        default:
            return state;
    }
};

export default wishListReducer;
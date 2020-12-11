import * as types from './../actions/types'


const initialState = {
    users: []
};


const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.CHAT_USER_LIST_REQUEST:
        case types.CHAT_USER_LIST_RESPONSE:
            return Object.assign({}, state, {
                users: {
                    ...action.payload
                }
            });
        default:
            return state;
    }
};

export default chatReducer;
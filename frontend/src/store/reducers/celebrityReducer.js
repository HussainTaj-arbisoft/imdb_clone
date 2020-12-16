import * as types from "../actions/types";

const initialState = {
  bornToday: {},
};

const celebrityReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.CELEBRITY_BORN_TODAY_LIST_REQUEST:
    case types.CELEBRITY_BORN_TODAY_LIST_RESPONSE:
      return Object.assign({}, state, {
        bornToday: {
          ...action.payload,
        },
      });
    default:
      return state;
  }
};

export default celebrityReducer;

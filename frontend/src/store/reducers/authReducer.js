import * as types from "../actions/types";

const initialState = {
  signIn: {
    isSigningIn: false,
    status: null,
    statusText: null,
    data: null,
  },
  user: null,
  authToken: null,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.AUTH_SIGNIN_REQUEST:
    case types.AUTH_SIGNIN_RESPONSE:
      return Object.assign({}, state, {
        ...action.payload,
        signIn: Object.assign({}, state.signIn, {
          ...action.payload.signIn,
        }),
      });
    case types.AUTH_SIGNUP_REQUEST:
    case types.AUTH_SIGNUP_RESPONSE:
      return Object.assign({}, state, {
        ...action.payload,
        signUp: Object.assign({}, state.signUp, {
          ...action.payload.signUp,
        }),
      });
    case types.AUTH_SIGNOUT:
      return Object.assign({}, state, {
        ...action.payload,
      });
    default:
      return state;
  }
};

export default authReducer;

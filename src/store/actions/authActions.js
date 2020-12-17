import axios from "axios";
import Cookies from "universal-cookie";

import { AUTH_SERVER_API_URL } from "../hosts";
import * as types from "./types";

const SIGNIN_TOKEN_URL = `${AUTH_SERVER_API_URL}/token/login/`;
const USER_ACCOUNT_INFO_URL = `${AUTH_SERVER_API_URL}/users/me/`;
const USER_ACCOUNT_CREATE_URL = `${AUTH_SERVER_API_URL}/users/`;
const USER_ACCOUNT_LOGOUT_URL = `${AUTH_SERVER_API_URL}/token/logout/`;

const cookies = new Cookies();

class AuthToken {
  static set(token) {
    cookies.set("token", token, { path: "/", sameSite: "strict" });
    axios.defaults.headers.common["Authorization"] = `Token ${token}`;
  }
  static get() {
    return cookies.get("token", { path: "/" });
  }
  static remove() {
    cookies.remove("token", { path: "/" });
    axios.defaults.headers.common["Authorization"] = null;
  }
}

const signInRequest = () => {
  return {
    type: types.AUTH_SIGNIN_REQUEST,
    payload: {
      signIn: {
        isSigningIn: true,
      },
    },
  };
};

const signUpRequest = () => {
  return {
    type: types.AUTH_SIGNUP_REQUEST,
    payload: {
      signUp: {
        isSigningUp: true,
      },
    },
  };
};

export const signInWithTokenCookie = () => (dispatch) => {
  let token = AuthToken.get();
  if (token) {
    dispatch(signInRequest());
    signInWithToken(token)(dispatch);
  } else {
    dispatch({
      type: types.AUTH_SIGNIN_RESPONSE,
      payload: {
        signIn: {
          isSigningIn: false,
        },
        isAuthenticated: false,
        signInWithTokenFailed: true,
      },
    });
  }
};

export const signInWithToken = (token) => (dispatch) => {
  axios
    .get(USER_ACCOUNT_INFO_URL, {
      headers: {
        // 'Content-Type': 'application/json',
        // 'Accept': 'application/json',
        Authorization: `Token ${token}`,
      },
    })
    .then((response) => {
      let { status, statusText, data } = response;
      AuthToken.set(token);
      dispatch({
        type: types.AUTH_SIGNIN_RESPONSE,
        payload: {
          signIn: {
            isSigningIn: false,
            status,
            statusText,
            data,
          },
          authToken: token,
          user: data,
          isAuthenticated: true,
          signInWithTokenFailed: false,
          signedOut: false,
        },
      });
    })
    .catch(({ response }) => {
      let { status, statusText, data } = response;
      AuthToken.remove();
      dispatch({
        type: types.AUTH_SIGNIN_RESPONSE,
        payload: {
          signIn: {
            isSigningIn: false,
            status,
            statusText,
            data,
          },
          isAuthenticated: false,
          signInWithTokenFailed: true,
        },
      });
    });
};

export const signIn = (email, password) => (dispatch) => {
  dispatch(signInRequest());
  axios
    .post(SIGNIN_TOKEN_URL, {
      email: email,
      password: password,
    })
    .then((response) => {
      let { data } = response;
      signInWithToken(data.auth_token)(dispatch);
    })
    .catch(({ response }) => {
      let { status, statusText, data } = response;
      dispatch({
        type: types.AUTH_SIGNIN_RESPONSE,
        payload: {
          signIn: {
            isSigningIn: false,
            status,
            statusText,
            data,
          },
        },
      });
    });
};

export const signUp = (firstName, lastName, email, password, repassword) => (
  dispatch
) => {
  dispatch(signUpRequest());
  let requestData = {
    first_name: firstName,
    last_name: lastName,
    email: email,
    password: password,
    re_password: repassword,
  };

  axios
    .post(USER_ACCOUNT_CREATE_URL, requestData)
    .then((response) => {
      let { status, statusText, data } = response;
      signIn(email, password)(dispatch);
      dispatch({
        type: types.AUTH_SIGNUP_RESPONSE,
        payload: {
          signUp: {
            isSigningUp: false,
            status,
            statusText,
            data,
          },
        },
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: types.AUTH_SIGNUP_RESPONSE,
        payload: {
          signUp: {
            isSigningUp: false,
            fieldErrors: response.data,
          },
        },
      });
    });
};

export const signOut = (authToken) => (dispatch) => {
  axios
    .post(USER_ACCOUNT_LOGOUT_URL)
    .then((response) => {
      AuthToken.remove();
      dispatch({
        type: types.AUTH_SIGNOUT,
        payload: {
          signUp: {},
          signIn: {},
          user: {},
          isAuthenticated: false,
          signInWithTokenFailed: null,
          authToken: null,
          signedOut: true,
        },
      });
    })
    .catch(({ response }) => {
      alert("Unable to Logout. Make sure you're connected to the internet.");
    });
};

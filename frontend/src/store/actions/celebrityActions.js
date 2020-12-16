import axios from "axios";

import { CELEBRITY_SERVER_API_URL } from "../hosts";
import * as types from "./types";

const CELEBRITIES_BORN_TODAY_URL = `${CELEBRITY_SERVER_API_URL}/born_today?limit=10`;

const listCelebritiesBornTodayRequest = () => {
  return {
    type: types.CELEBRITY_BORN_TODAY_LIST_REQUEST,
    payload: {
      status: "loading",
    },
  };
};

export const listCelebritiesBornToday = () => (dispatch) => {
  dispatch(listCelebritiesBornTodayRequest());
  axios
    .get(CELEBRITIES_BORN_TODAY_URL)
    .then((response) => {
      dispatch({
        type: types.CELEBRITY_BORN_TODAY_LIST_RESPONSE,
        payload: {
          status: "loaded",
          celebrities: response.data.results,
        },
      });
    })
    .catch(({ response }) => {
      dispatch({
        type: types.CELEBRITY_BORN_TODAY_LIST_RESPONSE,
        payload: {
          status: "error",
          statusCode: response.status,
          statusText: response.statusText,
          errorMessage: response.data.detail,
        },
      });
    });
};

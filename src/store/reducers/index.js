import { combineReducers } from "redux";

import authReducer from "./authReducer";
import celebrityReducer from "./celebrityReducer";
import chatReducer from "./chatReducer";
import movieReducer from "./movieReducer";
import wishListReducer from "./wishListReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  celebrities: celebrityReducer,
  auth: authReducer,
  chat: chatReducer,
  wishList: wishListReducer,
});

export default rootReducer;

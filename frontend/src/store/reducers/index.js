import { combineReducers } from "redux";
import movieReducer from "./movieReducer";
import celebrityReducer from "./celebrityReducer";
import authReducer from "./authReducer";
import chatReducer from "./chatReducer";
import wishListReducer from "./wishListReducer";

const rootReducer = combineReducers({
  movies: movieReducer,
  celebrities: celebrityReducer,
  auth: authReducer,
  chat: chatReducer,
  wishList: wishListReducer,
});

export default rootReducer;

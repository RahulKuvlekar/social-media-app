import { combineReducers } from "redux";
import articlesReducer from "./articlesReducer";
import loadingReducer from "./loadingReducer";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userInfoState: userReducer,
  loadingState: loadingReducer,
  articlesState: articlesReducer,
});

export default rootReducer;

import { combineReducers } from "redux";
import userReducer from "./userReducer";

const rootReducer = combineReducers({
  userInfoState: userReducer,
});

export default rootReducer;

import { createStore, applyMiddleware } from "redux";
import rootReducer from "../Reducers/rootReducer";
import ThunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(ThunkMiddleware))
);
export default store;

import { SET_LOADING_STATUS } from "../Actions/actionTypes";

const INITIAL_STATE = {
  loading: false,
};

const loadingReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...prevState,
        loading: action.status,
      };

    default:
      return prevState;
  }
};
export default loadingReducer;

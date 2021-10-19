import { SET_USER } from "../Actions/actionTypes";

const INITIAL_STATE = {
  user: null,
};

const userReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_USER:
      return {
        ...prevState,
        user: action.payload,
      };

    default:
      return prevState;
  }
};
export default userReducer;

import { SET_ARTICLES } from "../Actions/actionTypes";

const INITIAL_STATE = {
  articles: [],
};

const articlesReducer = (prevState = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ARTICLES:
      return {
        ...prevState,
        articles: action.payload,
      };

    default:
      return prevState;
  }
};
export default articlesReducer;

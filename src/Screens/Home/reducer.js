import {
  ALL_POST,
  CREATE_CMT,
  GET_ALL_CMT,
  HOME_CHANGE_STATE,
  POST_LOADING,
  UPLOAD_POST,
} from './constants';
const initialState = {
  post: [],
  postLoad: false,
  comments: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POST:
      return {...state, post: action.payload.data};
    case GET_ALL_CMT:
      return {...state, comments: action.payload.data};
    case POST_LOADING:
      return {...state, postLoad: action.payload.loading};
    case HOME_CHANGE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default reducer;

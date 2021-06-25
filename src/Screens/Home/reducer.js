import {
  ALL_POST,
  UPLOAD_POST,
  POST_LOADING,
  CREATE_CMT,
  GET_ALL_CMT,
  CONFIRM_DELETE_POST,
  CONFIRM_UPDATE_POST,
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
    // case MORE_POST:
    //   return {...state, post: [...state.post, ...action.payload.more]};
    case UPLOAD_POST:
      return {...state, post: [...state.post, action.payload.new]};
    case POST_LOADING:
      return {...state, postLoad: action.payload.loading};
    case CREATE_CMT:
      return {...state, comments: [...state.comments, action.payload.newCmt]};
    case CONFIRM_DELETE_POST:
      return {...state};
    case CONFIRM_UPDATE_POST:
      return {...state};
    default:
      return state;
  }
};
export default reducer;

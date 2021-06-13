import {ALL_POST, UPLOAD_POST, POST_LOADING, CREATE_CMT} from './constants';
const initialState = {
  post: [],
  postLoad: false,
  comments: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POST:
      return {...state, post: action.payload.data};
    // case MORE_POST:
    //   return {...state, post: [...state.post, ...action.payload.more]};
    case UPLOAD_POST:
      return {...state, post: [...state.post, action.payload.new]};
    case POST_LOADING:
      return {...state, postLoad: action.payload.loading};
    case CREATE_CMT:
      return {...state, comments: [...state.comments, action.payload.newCmt]};
    default:
      return state;
  }
};
export default reducer;

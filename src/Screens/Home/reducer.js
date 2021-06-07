import {ALL_POST, UPLOAD_POST, POST_LOADING, MORE_POST} from './constants';
const initialState = {
  post: [],
  postLoad: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ALL_POST:
      return {...state, post: action.payload.data};
    case MORE_POST:
      return {...state, post: [...state.post, ...action.payload.more]};
    case UPLOAD_POST:
      return {...state, post: [...state.post, action.payload.new]};
    case POST_LOADING:
      return {...state, postLoad: action.payload.loading};
    default:
      return state;
  }
};
export default reducer;

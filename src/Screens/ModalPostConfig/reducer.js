import {
  OPEN_POST_CONFIG,
  CLOSE_POST_CONFIG,
  CLOSE_CONFIRM,
  OPEN_CONFIRM,
} from './contants';
const initialState = {
  status: false,
  postId: '',
  confirm: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POST_CONFIG:
      return {...state, status: true, postId: action.payload.postId};
    case CLOSE_POST_CONFIG:
      return {...state, status: false};
    case OPEN_CONFIRM:
      return {...state, confirm: true};
    case CLOSE_CONFIRM:
      return {...state, confirm: false};
    default:
      return state;
  }
};

export default reducer;
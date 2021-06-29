import {OPEN_LIKE_MODAL, CLOSE_LIKE_MODAL} from './constants';
const initialState = {
  status: false,
  postId: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_LIKE_MODAL:
      return {...state, status: true, postId: action.payload.postId};
    case CLOSE_LIKE_MODAL:
      return {...state, status: false, postId: ''};
    default:
      return state;
  }
};

export default reducer;

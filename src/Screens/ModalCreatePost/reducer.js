import {
  MODAL_CREATE_POST,
  CLOSE_MODAL_POST,
  MODAL_CREATE_POST_IMG,
} from './contants';
const initialState = {
  image: null,
  status: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_CREATE_POST:
      return {...state, status: true};
    case CLOSE_MODAL_POST:
      return {...state, status: false, image: null};
    case MODAL_CREATE_POST_IMG:
      return {...state, status: true, image: action.payload.img};
    default:
      return state;
  }
};

export default reducer;

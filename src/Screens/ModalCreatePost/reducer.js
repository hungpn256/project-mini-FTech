import {
  MODAL_CREATE_POST,
  CLOSE_MODAL_POST,
  MODAL_CREATE_POST_IMG,
  CLOSE_IMG_CMT,
  MODAL_UPDATE_POST,
} from './contants';
const initialState = {
  image: null,
  status: false,
  update: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_CREATE_POST:
      return {...state, status: true, update: false};
    case CLOSE_MODAL_POST:
      return {...state, status: false, image: null, update: false};
    case MODAL_CREATE_POST_IMG:
      return {...state, status: true, image: action.payload.img};
    case CLOSE_IMG_CMT:
      return {...state, image: null};
    case MODAL_UPDATE_POST:
      return {...state, update: true, status: true};
    default:
      return state;
  }
};

export default reducer;

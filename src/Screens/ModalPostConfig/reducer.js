import {
  CLOSE_MODAL_POST,
  MODAL_CREATE_POST,
  MODAL_CREATE_POST_IMG,
} from '../ModalCreatePost/contants';
import {
  OPEN_POST_CONFIG,
  CLOSE_POST_CONFIG,
  CLOSE_CONFIRM,
  OPEN_CONFIRM,
  CLOSE_UPDATE_IMG,
  CLEAR_UPDATE_TEXT,
} from './contants';

const initialState = {
  status: false,
  postId: '',
  confirm: false,
  content: '',
  image: '',
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_CREATE_POST:
      return {
        ...state,
        confirm: false,
        status: false,
        image: '',
        content: '',
        update: false,
      };
    case MODAL_CREATE_POST_IMG:
      return {
        ...state,
        confirm: false,
        status: false,
        image: '',
        content: '',
        update: false,
      };
    case OPEN_POST_CONFIG:
      return {
        ...state,
        status: true,
        postId: action.payload.postId,
        content: action.payload.content,
        image: action.payload.image,
      };
    case CLOSE_POST_CONFIG:
      return {...state, status: false, update: false};
    case OPEN_CONFIRM:
      return {...state, confirm: true};
    case CLOSE_CONFIRM:
      return {
        ...state,
        confirm: false,
        status: false,
        image: '',
        content: '',
        update: false,
      };
    case CLOSE_UPDATE_IMG:
      return {...state, image: ''};
    case CLEAR_UPDATE_TEXT:
      return {...initialState};
    case CLOSE_MODAL_POST:
      return {...state, status: false, image: '', update: false};
    default:
      return state;
  }
};

export default reducer;

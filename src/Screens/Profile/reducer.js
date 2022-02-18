import {
  GET_ME_SUCCESS,
  PROFILE_CHANGE_STATE,
  GET_PROFILE_SUCCESS,
  GET_POST_PROFILE_SUCCESS,
} from './constants';

const initialState = {
  user: null,
  profile: {},
  loading: false,
  posts: [],
  postsProfile: [],
  role: 3,
  editing: false,
  visibleModal: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PROFILE_CHANGE_STATE: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_ME_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_PROFILE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case GET_POST_PROFILE_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    default:
      return state;
  }
};
export default reducer;

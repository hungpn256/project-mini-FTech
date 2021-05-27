const initialState = {
  user: null,
  loading: false,
  isLoged: false,
  registerSuccess: false,
};
import {AUTH_CHANGE_STATE, LOGIN_SUCCESS, REGISTER_SUCCESS} from './constants';
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case AUTH_CHANGE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload,
        isLoged: true,
      };
    case REGISTER_SUCCESS:
      return {
        ...state,
        registerSuccess: true,
      };
    default:
      return state;
  }
};
export default reducer;

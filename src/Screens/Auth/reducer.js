const initialState = {
  loading: false,
  isLogged: false,
  splashScreen: true,
  user: null,
};
import {
  AUTH_CHANGE_STATE,
  LOGIN_SUCCESS,
  USER_STATUS,
  USER_INFO,
  USER_CLEAR,
  SPLASH,
} from './constants';
const reducer = (state = initialState, action) => {
  console.log(state.user);
  switch (action.type) {
    case SPLASH:
      return {...state, splashScreen: false};
    case USER_INFO:
      return {...state, user: action.payload};
    case USER_CLEAR:
      return {...state, user: null};
    case AUTH_CHANGE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case USER_STATUS: {
      return {
        ...state,
        isLogged: action.payload.status,
      };
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.status,
      };
    default:
      return state;
  }
};
export default reducer;

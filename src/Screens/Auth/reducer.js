const initialState = {
  loading: false,
  isLogged: false,
};
import {AUTH_CHANGE_STATE, LOGIN_SUCCESS, USER_STATUS} from './constants';
const reducer = (state = initialState, action) => {
  console.log(action);
  switch (action.type) {
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
        isLogged: action.payload.status,
      };
    default:
      return state;
  }
};
export default reducer;

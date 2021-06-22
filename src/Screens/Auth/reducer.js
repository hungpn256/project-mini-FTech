const initialState = {
  loading: false,
  isLogged: false,
  splashScreen: true,
  user: null,
};
import {CREATE_CONVERSATION_SUCCESS} from '../ChatRoom/constants';
import {RECHARGE_MONEY_SUCCESS} from '../Pay/constaints';
import {
  AUTH_CHANGE_STATE,
  LOGIN_SUCCESS,
  USER_STATUS,
  USER_INFO,
  USER_CLEAR,
  SPLASH,
} from './constants';
const reducer = (state = initialState, action) => {
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
    case CREATE_CONVERSATION_SUCCESS: {
      let newUser = {...state.user};
      newUser.roomChatList = [...newUser.roomChatList, action.payload.id];
      return {...state, user: newUser};
    }
    case LOGIN_SUCCESS:
      return {
        ...state,
        user: action.payload.status,
      };
    case RECHARGE_MONEY_SUCCESS:
      return {
        ...state,
        user: {...state.user, money: state.user.money + action.payload},
      };
    default:
      return state;
  }
};
export default reducer;

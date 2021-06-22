import {
  CHAT_CHANGE_STATE,
  GET_CONVERSATION_SUCCESS,
  GET_USER_BY_NAME_SUCCESS,
  GET_CONVERSATION_FAILURE,
  SEND_MESSAGE_SUCCESS,
  DELETE_CONVERSION,
} from './constants';

const initialState = {
  search: '',
  userSearch: [],
  conversation: {},
  unread: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_CHANGE_STATE: {
      return {...state, ...action.payload};
    }
    case GET_USER_BY_NAME_SUCCESS: {
      return {...state, userSearch: action.payload};
    }
    case GET_CONVERSATION_SUCCESS: {
      return {
        ...state,
        conversation: {
          ...state.conversation,
          ...action.payload,
        },
      };
    }

    case GET_CONVERSATION_FAILURE: {
      return {
        ...state,
        conversation: action.payload,
      };
    }
    case SEND_MESSAGE_SUCCESS: {
      const {payload} = action;
      let tmp = {...state};
      tmp.conversation[payload.roomId].messages.push(payload.messages[0]);
      console.log(payload.messages[0]);
      console.log(payload.roomId);
      console.log(tmp, 'tmp');
      return tmp;
    }
    case DELETE_CONVERSION: {
      const tmp = {...state};
      delete tmp.conversation[action.payload];
      console.log(tmp, 'tmp');
      return {...tmp};
    }
    default:
      return state;
  }
};
export default reducer;

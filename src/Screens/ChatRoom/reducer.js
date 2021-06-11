import {
  CHAT_CHANGE_STATE,
  GET_CONVERSATION_SUCCESS,
  GET_USER_BY_NAME_SUCCESS,
  GET_CONVERSATION_FAILURE,
} from './constants';

const initialState = {
  search: '',
  userSearch: [],
  conversation: {},
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
    default:
      return state;
  }
};
export default reducer;

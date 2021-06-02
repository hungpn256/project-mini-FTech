import {CHAT_CHANGE_STATE, GET_USER_BY_NAME_SUCCESS} from './constants';

const initialState = {
  search: '',
  userSearch: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_CHANGE_STATE: {
      return {...state, ...action.payload};
    }
    case GET_USER_BY_NAME_SUCCESS: {
      return {...state, userSearch: action.payload};
    }
    default:
      return state;
  }
};
export default reducer;

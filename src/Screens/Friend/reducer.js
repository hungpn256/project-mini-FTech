import {FRIEND_CHANGE_STATE, GET_FRIEND_SUCCESS} from './constants';
const initialState = {
  loadFriend: false,
  accepted: [],
  pending: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_FRIEND_SUCCESS: {
      return {
        ...state,
        ...action.payload,
      };
    }
    case FRIEND_CHANGE_STATE: {
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

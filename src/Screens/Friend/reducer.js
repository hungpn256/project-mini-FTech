import {GET_FRIEND_SUCCESS} from './constants';
const initialState = {
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
    default:
      return state;
  }
};
export default reducer;

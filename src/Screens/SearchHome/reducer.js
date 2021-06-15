import {USERINFO_DATA} from './constants';

const initialState = {
  users: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case USERINFO_DATA:
      return {...state, users: action.payload.userSearch};
    default:
      return state;
  }
};

export default reducer;

import {ALL_USER_WALLET_SUCCESS, WALLET_CHANGE_STATE} from './constaints';

const initialState = {
  rechargeSuccess: false,
  withdrawSuccess: false,
  users: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_CHANGE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case ALL_USER_WALLET_SUCCESS:
      return {...state, users: action.payload.res};
    default:
      return state;
  }
};
export default reducer;

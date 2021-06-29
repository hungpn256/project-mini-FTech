import {WALLET_CHANGE_STATE} from './constaints';

const initialState = {
  rechargeSuccess: false,
  withdrawSuccess: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case WALLET_CHANGE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};
export default reducer;

import {
  ALL_USER_WALLET_SUCCESS,
  WALLET_CHANGE_STATE,
  OPEN_MODAL_USER,
  CLOSE_MODAL_USER,
  WALLET_TRANSFER_SUCCESS,
  RECHARGE_MONEY_SUCCESS,
  WITHDRAW_MONEY_SUCCESS,
} from './constaints';

const initialState = {
  rechargeSuccess: false,
  withdrawSuccess: false,
  transferSuccess: false,
  users: [],
  modal: false,
  user: '',
  loading: false,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_MODAL_USER:
      return {...state, modal: true, user: action.payload.item};
    case CLOSE_MODAL_USER:
      return {...state, modal: false, user: ''};
    case WALLET_CHANGE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case ALL_USER_WALLET_SUCCESS:
      return {
        ...state,
        users: action.payload.res,
      };
    case RECHARGE_MONEY_SUCCESS:
      return {
        ...state,
        rechargeSuccess: true,
      };
    case WITHDRAW_MONEY_SUCCESS:
      return {
        ...state,
        withdrawSuccess: true,
      };
    case WALLET_TRANSFER_SUCCESS:
      return {...state};
    default:
      return state;
  }
};
export default reducer;

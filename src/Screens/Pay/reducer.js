import {
  ALL_USER_WALLET_SUCCESS,
  WALLET_CHANGE_STATE,
  OPEN_MODAL_USER,
  CLOSE_MODAL_USER,
  WALLET_TRANSFER_SUCCESS,
} from './constaints';

const initialState = {
  rechargeSuccess: false,
  withdrawSuccess: false,
  transferSuccess: false,
  users: [],
<<<<<<< HEAD
  modal: false,
  user: '',
=======
>>>>>>> 28ec77bd383ba405be24202d679f4d058b878b0e
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
      return {...state, users: action.payload.res};
    case WALLET_TRANSFER_SUCCESS:
      return {...state};
    default:
      return state;
  }
};
export default reducer;

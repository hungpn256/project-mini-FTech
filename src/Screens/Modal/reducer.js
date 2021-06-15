import {MODAL_CHANGE_STATE} from './constant';
const initialState = {
  image: null,
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case MODAL_CHANGE_STATE:
      return {...state, ...action.payload};
    default:
      return state;
  }
};
export default reducer;

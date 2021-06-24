import {OPEN_POST_EDIT, CLOSE_POST_EDIT} from './constants';
const initialState = {
  status: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case OPEN_POST_EDIT:
      return {...state, status: true};
    case CLOSE_POST_EDIT:
      return {...state, status: false};
    default:
      return state;
  }
};

export default reducer;

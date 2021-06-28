import {
  GET_NOTIFICATIONS_SUCCESS,
  MARK_READ_ALL,
  MARK_READ_NOTIFICATION,
  NOTIFICATION_CHANGE_STATE,
} from './constants';

const initialState = {
  notifications: [],
};
const reducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTIFICATIONS_SUCCESS:
      return {
        ...state,
        notifications: action.payload,
      };
    case NOTIFICATION_CHANGE_STATE:
      return {
        ...state,
        ...action.payload,
      };
    case MARK_READ_NOTIFICATION:
      const tmp = [...state.notifications];
      tmp.find(item => item.id === action.payload).unread = false;
      return {
        ...state,
        notifications: tmp,
      };
    case MARK_READ_ALL:
      let tmpNoti = [...state.notifications];
      tmpNoti.forEach(i => {
        i.unread = false;
      });
      return {
        ...state,
        notifications: tmpNoti,
      };
    default:
      return state;
  }
};
export default reducer;

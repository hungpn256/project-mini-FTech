import {combineReducers} from 'redux';
import home from './Screens/Home/reducer';
import auth from './Screens/Auth/reducer';
import chat from './Screens/ChatRoom/reducer';
import profile from './Screens/Profile/reducer';
import search from './Screens/SearchHome/reducer';
import modal from './Screens/Modal/reducer';
import friend from './Screens/Friend/reducer';
import modalCreatePost from './Screens/ModalCreatePost/reducer';
const rootReducer = combineReducers({
  home,
  auth,
  profile,
  chat,
  search,
  modal,
  friend,
  modalCreatePost,
});

export default rootReducer;

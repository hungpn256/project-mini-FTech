import {combineReducers} from 'redux';
import auth from './Screens/Auth/reducer';
import chat from './Screens/ChatRoom/reducer';
import friend from './Screens/Friend/reducer';
import home from './Screens/Home/reducer';
import modal from './Screens/Modal/reducer';
import modalCreatePost from './Screens/ModalCreatePost/reducer';
import modalLike from './Screens/ModalLike/reducer';
import modalPostConfig from './Screens/ModalPostConfig/reducer';
import notification from './Screens/Notification/reducer';
import wallet from './Screens/Pay/reducer';
import profile from './Screens/Profile/reducer';
import search from './Screens/SearchHome/reducer';
const rootReducer = combineReducers({
  home,
  auth,
  profile,
  chat,
  search,
  modal,
  friend,
  modalCreatePost,
  wallet,
  modalPostConfig,
  notification,
  modalLike,
});

export default rootReducer;

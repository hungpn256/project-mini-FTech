import {combineReducers} from 'redux';
import home from './Screens/Home/reducer';
import auth from './Screens/Auth/reducer';
import chat from './Screens/ChatRoom/reducer';
import profile from './Screens/Profile/reducer';
import search from './Screens/SearchHome/reducer';
import modal from './Screens/Modal/reducer';
import friend from './Screens/Friend/reducer';
import modalCreatePost from './Screens/ModalCreatePost/reducer';
import wallet from './Screens/Pay/reducer';
import modalPostConfig from './Screens/ModalPostConfig/reducer';
import modalEditPost from './Screens/ModalEditPost/reducer';
import notification from './Screens/Notification/reducer';
import modalLike from './Screens/ModalLike/reducer';
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

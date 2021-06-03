import {combineReducers} from 'redux';
import home from './Screens/Home/reducer';
import auth from './Screens/Auth/reducer';
import chat from './Screens/ChatRoom/reducer';
const rootReducer = combineReducers({home, auth, chat});

export default rootReducer;

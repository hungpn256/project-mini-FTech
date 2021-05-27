import {combineReducers} from 'redux';
import home from './Screens/Home/reducer';
import auth from './Screens/Auth/reducer';
const rootReducer = combineReducers({home, auth});

export default rootReducer;

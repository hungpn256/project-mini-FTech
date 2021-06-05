import {all} from 'redux-saga/effects';
import watchLoginSaga from './Screens/Auth/saga';
import watchChatSaga from './Screens/ChatRoom/saga';
import watchPostSaga from './Screens/Home/saga';
function* rootSaga() {
  yield all([watchLoginSaga(), watchChatSaga(), watchPostSaga()]);
}
export default rootSaga;

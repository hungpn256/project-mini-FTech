import {all} from 'redux-saga/effects';
import watchLoginSaga from './Screens/Auth/saga';
import watchChatSaga from './Screens/ChatRoom/saga';
function* rootSaga() {
  yield all([watchLoginSaga(), watchChatSaga()]);
}
export default rootSaga;

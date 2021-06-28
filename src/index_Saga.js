import {all} from 'redux-saga/effects';
import watchLoginSaga from './Screens/Auth/saga';
import watchChatSaga from './Screens/ChatRoom/saga';
import watchFriendSaga from './Screens/Friend/saga';
import watchPostSaga from './Screens/Home/saga';
import watchProfileSaga from './Screens/Profile/saga';
import rechargeMoneySaga from './Screens/Pay/saga';
import watchSearchSaga from './Screens/SearchHome/saga';
import watchNotifySaga from './Screens/Notification/saga';
function* rootSaga() {
  yield all([
    watchLoginSaga(),
    watchChatSaga(),
    watchPostSaga(),
    watchProfileSaga(),
    rechargeMoneySaga(),
    watchSearchSaga(),
    watchFriendSaga(),
    watchNotifySaga(),
  ]);
}
export default rootSaga;

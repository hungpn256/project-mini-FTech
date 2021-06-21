import {all} from 'redux-saga/effects';
import watchLoginSaga from './Screens/Auth/saga';
import watchChatSaga from './Screens/ChatRoom/saga';
import watchFriendSaga from './Screens/Friend/saga';
import watchPostSaga from './Screens/Home/saga';
import watchProfileSaga from './Screens/Profile/saga';
import paySaga from './Screens/Pay/saga';
import watchSearchSaga from './Screens/SearchHome/saga';
function* rootSaga() {
  yield all([
    watchLoginSaga(),
    watchChatSaga(),
    watchPostSaga(),
    watchProfileSaga(),
<<<<<<< HEAD
    paySaga(),
=======
    rechargeMoneySaga(),
    watchSearchSaga(),
    watchFriendSaga(),
>>>>>>> e821b222cb5c48e058208f83fc8f1421e6c0f726
  ]);
}
export default rootSaga;

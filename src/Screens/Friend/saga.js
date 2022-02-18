import {all, call, select, takeLatest, put} from 'redux-saga/effects';
import {FRIEND_CHANGE_STATE, GET_FRIEND, GET_FRIEND_SUCCESS} from './constants';
import {getUser} from './service';

function* getFriendSaga({payload}) {
  console.log('res', new Date());
  try {
    yield put({type: FRIEND_CHANGE_STATE, payload: {loadFriend: true}});
    const friendFB = yield select(state => state.auth.user.friend);
    console.log('res', new Date());
    let friend = yield friendFB.get();
    friend = friend.data();
    console.log('res', new Date());
    const [res, res2] = yield all([
      call(getUser, friend.pending),
      call(getUser, friend.accepted),
    ]);
    console.log('res', new Date());
    yield put({
      type: GET_FRIEND_SUCCESS,
      payload: {pending: res, accepted: res2},
    });
  } catch (e) {
    console.log(e);
  } finally {
    yield put({type: FRIEND_CHANGE_STATE, payload: {loadFriend: false}});
  }
}

function* watchFriendSaga() {
  yield takeLatest(GET_FRIEND, getFriendSaga);
}
export default watchFriendSaga;

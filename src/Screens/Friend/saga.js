import {all, call, select, takeLatest, put} from 'redux-saga/effects';
import {GET_FRIEND, GET_FRIEND_SUCCESS} from './constants';
import {getUser} from './service';

function* getFriendSaga({payload}) {
  try {
    const friendFB = yield select(state => state.auth.user.friend);
    const friend = (yield friendFB.get()).data();
    const res = yield all([...friend.pending.map(i => call(getUser, i))]);
    yield put({type: GET_FRIEND_SUCCESS, payload: {pending: res}});
  } catch (e) {
    console.log(e);
  }
}

function* watchFriendSaga() {
  yield takeLatest(GET_FRIEND, getFriendSaga);
}
export default watchFriendSaga;

import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  NOTIFICATION_CHANGE_STATE,
} from './constants';
import {call, put, takeLatest} from 'redux-saga/effects';
import {getNoti} from './service';

function* getNotiSaga() {
  try {
    yield put({type: NOTIFICATION_CHANGE_STATE, payload: {loading: true}});
    const res = yield call(getNoti);
    console.log(res, 'get noti');
    yield put({type: GET_NOTIFICATIONS_SUCCESS, payload: res});
  } catch (error) {
    console.log('getnoti fail', error);
  } finally {
    yield put({type: NOTIFICATION_CHANGE_STATE, payload: {loading: false}});
  }
}

function* watchNotifySaga() {
  yield takeLatest(GET_NOTIFICATIONS, getNotiSaga);
}
export default watchNotifySaga;

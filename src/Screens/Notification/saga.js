import {
  GET_NOTIFICATIONS,
  GET_NOTIFICATIONS_SUCCESS,
  MARK_READ_ALL,
  NOTIFICATION_CHANGE_STATE,
} from './constants';
import {call, put, takeLatest} from 'redux-saga/effects';
import {getNoti, markReadAll} from './service';

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

function* markReadAllSaga() {
  try {
    yield call(markReadAll);
  } catch (error) {
    console.log(error);
  }
}

function* watchNotifySaga() {
  yield takeLatest(GET_NOTIFICATIONS, getNotiSaga);
  yield takeLatest(MARK_READ_ALL, markReadAllSaga);
}
export default watchNotifySaga;

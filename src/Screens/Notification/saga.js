import {GET_NOTIFICATIONS, GET_NOTIFICATIONS_SUCCESS} from './constants';
import {call, put, takeLatest} from 'redux-saga/effects';
import {getNoti} from './service';

function* getNotiSaga() {
  try {
    const res = yield call(getNoti);
    console.log(res, 'get noti');
    yield put({type: GET_NOTIFICATIONS_SUCCESS, payload: res});
  } catch (error) {
    console.log('getnoti fail', error);
  }
}

function* watchNotifySaga() {
  yield takeLatest(GET_NOTIFICATIONS, getNotiSaga);
}
export default watchNotifySaga;

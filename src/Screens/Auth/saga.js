import {takeLatest, put, call, delay} from '@redux-saga/core/effects';
import * as AUTH_CONST from './constants';
import {login, register} from './service';
function* handleLoginSaga({payload}) {
  yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: true}});
  try {
    const res = yield call(login, payload);
    yield put({type: AUTH_CONST.LOGIN_SUCCESS, payload: res});
    console.log(res, 'login');
  } catch (err) {
    console.log(err);
  } finally {
    yield delay(200);
    yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: false}});
  }
}
function* handleRegisterSaga({payload}) {
  yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: true}});
  try {
    const res = yield call(register, payload);
    yield put({type: AUTH_CONST.REGISTER_SUCCESS, payload: res});
    console.log(res, 'register');
  } catch (err) {
    console.log(err);
  } finally {
    yield delay(200);
    yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: false}});
  }
}
function* watchLoginSaga() {
  yield takeLatest(AUTH_CONST.LOGIN, handleLoginSaga);
  yield takeLatest(AUTH_CONST.REGISTER, handleRegisterSaga);
}
export default watchLoginSaga;

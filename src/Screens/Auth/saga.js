import {takeLatest, put, call, delay} from '@redux-saga/core/effects';
import {log} from 'react-native-reanimated';
import * as AUTH_CONST from './constants';
import {login, register, logout, loginGoogle, userDocument} from './service';

function* handleLoginSaga({payload}) {
  yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: true}});
  try {
    const res = yield call(login, payload);
    yield put({type: AUTH_CONST.LOGIN_SUCCESS, payload: {status: res}});
  } catch (err) {
    console.log(err);
  } finally {
    yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: false}});
  }
}

// trang thai nguoi dung dang dang nhap, hay ko dang nhap
// function* handleStatus({payload}) {
//   console.log(payload);
//   try {
//     yield put({type: AUTH_CONST.USER_STATUS, payload: {status: payload}});
//   } catch (err) {
//     console.log(err);
//   }
// }

// log out
function* handleLogoutSaga() {
  yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: true}});
  try {
    yield call(logout);
    yield put({type: AUTH_CONST.LOGIN_SUCCESS, payload: {status: false}});
  } catch (err) {
    console.log(err);
  } finally {
    yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: false}});
  }
}

function* handleRegisterSaga({payload}) {
  yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: true}});
  try {
    const res = yield call(register, payload);
    yield put({type: AUTH_CONST.LOGIN_SUCCESS, payload: {status: res}});
  } catch (err) {
    console.log(err);
  } finally {
    yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: false}});
  }
}

function* handleGoogle() {
  yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: true}});
  try {
    const res = yield call(loginGoogle);
    if (res) {
      yield put({type: AUTH_CONST.LOGIN_SUCCESS, payload: {status: res}});
    }
  } catch (err) {
    console.log(err);
  } finally {
    yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: false}});
  }
}

function* handleUser() {
  try {
    const res = yield call(userDocument);
    if (res !== null) {
      yield put({type: AUTH_CONST.USER_INFO, payload: res});
      yield put({type: AUTH_CONST.SPLASH});
    }
  } catch (error) {
    console.log(error);
  }
}

function* handleUserClear() {
  try {
    yield put({type: AUTH_CONST.USER_CLEAR});
    yield put({type: AUTH_CONST.SPLASH});
  } catch (error) {
    console.log(error);
  }
}

function* watchLoginSaga() {
  yield takeLatest(AUTH_CONST.LOGIN, handleLoginSaga);
  yield takeLatest(AUTH_CONST.REGISTER, handleRegisterSaga);
  yield takeLatest(AUTH_CONST.LOGOUT, handleLogoutSaga);
  // yield takeLatest(AUTH_CONST.CHECK, handleStatus);
  yield takeLatest(AUTH_CONST.GOOGLE, handleGoogle);
  yield takeLatest(AUTH_CONST.USER_SET, handleUser);
  yield takeLatest(AUTH_CONST.USER_DEL, handleUserClear);
}
export default watchLoginSaga;

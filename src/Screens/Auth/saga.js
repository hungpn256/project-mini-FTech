import {takeLatest, put, call, delay} from '@redux-saga/core/effects';
import * as AUTH_CONST from './constants';
import {login, register,logout, loginGoogle} from './service';

function* handleLoginSaga({payload}) {
  yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: true}});
  try {
    const res = yield call(login, payload);
    yield put({type: AUTH_CONST.LOGIN_SUCCESS,payload:{status:res}});
    yield delay(200);
    yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: false}});
  } catch (err) {
    console.log(err);
  }
}

// trang thai nguoi dung dang dang nhap, hay ko dang nhap
function* handleStatus({payload}){
  console.log(payload);
  try {
    yield put({type: AUTH_CONST.USER_STATUS,payload:{status:payload}});
  } catch (err) {
    console.log(err);
  }
}

// log out
function* handleLogoutSaga(){
  try {
    yield call(logout);
    yield put({type: AUTH_CONST.LOGIN_SUCCESS,payload:{status:false}});
  } catch (err) {
    console.log(err);
  } 
}

function* handleRegisterSaga({payload}) {
  yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: true}});
  try {
    const res = yield call(register, payload);
    yield put({type: AUTH_CONST.LOGIN_SUCCESS, payload: {status:res}});
    yield delay(200);
    yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: false}});
  } catch (err) {
    console.log(err);
  } 
}

function* handleGoogle(){
  yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: true}});
  try {
    const res = yield call(loginGoogle);
    if (res) {
          yield put({type: AUTH_CONST.LOGIN_SUCCESS, payload: {status:true}});
    }
    yield delay(200);
    yield put({type: AUTH_CONST.AUTH_CHANGE_STATE, payload: {loading: false}});
  } catch (err) {
    console.log(err);
  } 
}

function* watchLoginSaga() {
  yield takeLatest(AUTH_CONST.LOGIN, handleLoginSaga);
  yield takeLatest(AUTH_CONST.REGISTER, handleRegisterSaga);
  yield takeLatest(AUTH_CONST.LOGOUT, handleLogoutSaga);
  yield takeLatest(AUTH_CONST.CHECK, handleStatus)
  yield takeLatest(AUTH_CONST.GOOGLE, handleGoogle)
}
export default watchLoginSaga;

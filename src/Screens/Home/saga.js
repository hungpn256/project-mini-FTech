import {
  call,
  delay,
  put,
  takeLatest,
  takeEvery,
} from '@redux-saga/core/effects';

import {
  CREATE_POST,
  POST_LOADING,
  UPLOAD_POST,
  GET_POST,
  ALL_POST,
} from './constants';

import {uploadPost, getAll} from './service';

function* handleCreatePost({payload}) {
  yield put({type: POST_LOADING, payload: {loading: true}});
  try {
    const res = yield call(uploadPost, payload);
    console.log('DATAAAAAAAAAAadadasdsadsad' + res);
    yield put({type: UPLOAD_POST, payload: {new: res}});
    yield delay(100);
  } catch (err) {
    console.log(err);
  } finally {
    yield put({type: POST_LOADING, payload: {loading: false}});
  }
}

function* handleGetPost() {
  try {
    const res = yield call(getAll);
    console.log(res);
    yield put({type: ALL_POST, payload: {data: res}});
  } catch (err) {
    console.log(err);
  }
}
function* watchPostSaga() {
  yield takeLatest(CREATE_POST, handleCreatePost);
  yield takeLatest(GET_POST, handleGetPost);
}
export default watchPostSaga;

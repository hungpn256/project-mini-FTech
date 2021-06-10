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
  GET_MORE,
  MORE_POST,
} from './constants';

import {uploadPost, getAll, getMore} from './service';

function* handleCreatePost({payload}) {
  yield put({type: POST_LOADING, payload: {loading: true}});
  try {
    const res = yield call(uploadPost, payload);
    yield put({type: UPLOAD_POST, payload: {new: res}});
    yield delay(100);
  } catch (err) {
    console.log(err);
  } finally {
    yield put({type: POST_LOADING, payload: {loading: false}});
  }
}

function* handleGetPost({payload}) {
  try {
    const res = yield call(getAll, payload);
    console.log(res);
    yield put({type: ALL_POST, payload: {data: res}});
  } catch (err) {
    console.log(err);
  }
}

function* handleGetMore() {
  try {
    const res = yield call(getMore);
    yield put({type: MORE_POST, payload: {more: res}});
  } catch (error) {}
}
function* watchPostSaga() {
  yield takeLatest(CREATE_POST, handleCreatePost);
  yield takeLatest(GET_POST, handleGetPost);
  // yield takeLatest(GET_MORE, handleGetMore);
}
export default watchPostSaga;

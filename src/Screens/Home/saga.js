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
  CMT,
  CREATE_CMT,
} from './constants';

import {uploadPost, getAll, getMore, createCmt} from './service';

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

function* handleGetPost() {
  try {
    const res = yield call(getAll);
    console.log(res);
    yield put({type: ALL_POST, payload: {data: res}});
  } catch (err) {
    console.log(err);
  }
}
function* handleCmt({payload}) {
  try {
    const res = yield call(createCmt, payload);
    yield put({type: CREATE_CMT, payload: {newCmt: res}});
  } catch (error) {
    console.log(err);
  }
}
// function* handleGetMore() {
//   try {
//     const res = yield call(getMore);
//     yield put({type: MORE_POST, payload: {more: res}});
//   } catch (error) {}
// }
function* watchPostSaga() {
  yield takeLatest(CREATE_POST, handleCreatePost);
  yield takeLatest(GET_POST, handleGetPost);
  // yield takeLatest(GET_MORE, handleGetMore);
  yield takeLatest(CMT, handleCmt);
}
export default watchPostSaga;

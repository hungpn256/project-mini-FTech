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
  GET_CMT,
  GET_ALL_CMT,
  DELETE_POST,
  CONFIRM_DELETE_POST,
} from './constants';
import {CLOSE_MODAL_POST} from '../ModalCreatePost/contants';
imp;
import {
  uploadPost,
  getAll,
  getMore,
  createCmt,
  getAllCmt,
  deletePost,
} from './service';

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
    yield put({type: CLOSE_MODAL_POST});
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
    console.log(error);
  }
}

function* handleAllCmt() {
  try {
    const res = yield call(getAllCmt);
    yield put({type: GET_ALL_CMT, payload: {data: res}});
  } catch (error) {
    console.log(error);
  }
}
function* handleDeletePost({payload}) {
  try {
    yield call(deletePost, payload);
    yield put({type: CONFIRM_DELETE_POST});
  } catch (error) {
    console.log(error);
  } finally {
    yield put({type: POST_LOADING, payload: {loading: false}});
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
  yield takeLatest(GET_CMT, handleAllCmt);
  yield takeLatest(DELETE_POST, handleDeletePost);
}
export default watchPostSaga;

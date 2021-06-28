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
  CONFIRM_UPDATE_POST,
  UPDATE_POST,
} from './constants';
import {CLOSE_MODAL_POST} from '../ModalCreatePost/contants';
import {
  uploadPost,
  getAll,
  getMore,
  createCmt,
  getAllCmt,
  deletePost,
  updatePost,
  dataUser,
  postReceived,
} from './service';
import {
  CLEAR_UPDATE_TEXT,
  CLOSE_CONFIRM,
  CLOSE_UPDATE_IMG,
} from '../ModalPostConfig/contants';
import {addNoti, notiMes} from '../Notification/service';

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
    const userCmt = yield call(dataUser);
    const received = yield call(postReceived, {postId: payload.postId});
    yield put({type: CREATE_CMT, payload: {newCmt: res}});
    yield call(addNoti, {postId: payload.postId, type: 0});
    if (received.token && received.token.length > 0) {
      yield call(notiMes, {
        title: `${userCmt.name} đã bình luận vào bài viết của bạn`,
        body:
          res.content?.length > 0
            ? res.content
            : `${userCmt.name} đã bình luận một hình ảnh`,
        token: received.token,
        image: res?.image ?? null,
      });
    }
    console.log(res, 'ré cmt');
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
  yield put({type: POST_LOADING, payload: {loading: true}});
  try {
    yield call(deletePost, payload);
    yield put({type: CONFIRM_DELETE_POST});
  } catch (error) {
    console.log(error);
  } finally {
    yield put({type: POST_LOADING, payload: {loading: false}});
    yield put({type: CLOSE_CONFIRM});
  }
}
function* handleUpdatePost({payload}) {
  yield put({type: POST_LOADING, payload: {loading: true}});
  try {
    yield call(updatePost, payload);
    yield put({type: CONFIRM_UPDATE_POST});
  } catch (error) {
    console.log(error);
  } finally {
    yield put({type: POST_LOADING, payload: {loading: false}});
    yield put({type: CLEAR_UPDATE_TEXT});
    yield put({type: CLOSE_UPDATE_IMG});
    yield put({type: CLOSE_MODAL_POST});
  }
}
function* watchPostSaga() {
  yield takeLatest(CREATE_POST, handleCreatePost);
  yield takeLatest(GET_POST, handleGetPost);
  // yield takeLatest(GET_MORE, handleGetMore);
  yield takeLatest(CMT, handleCmt);
  yield takeLatest(GET_CMT, handleAllCmt);
  yield takeLatest(DELETE_POST, handleDeletePost);
  yield takeLatest(UPDATE_POST, handleUpdatePost);
}
export default watchPostSaga;

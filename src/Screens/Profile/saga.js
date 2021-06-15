import {uploadImg} from '*/Helper/function';
import auth from '@react-native-firebase/auth';
import {all, call, put, select, takeEvery} from '@redux-saga/core/effects';
import {CREATE_POST} from '../Home/constants';
import {
  GET_ME,
  GET_ME_SUCCESS,
  GET_POST_PROFILE_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  PROFILE_CHANGE_STATE,
  UPDATE_ME,
} from './constants';
import {getPostMe, getProfile, updateMe} from './service';
function* getMeSaga({payload}) {
  try {
    yield put({type: PROFILE_CHANGE_STATE, payload: {loading: true}});
    const [res, posts] = yield all([
      call(getProfile, payload),
      call(getPostMe, payload),
    ]);
    const idAuth = yield select(state => state.auth.user.id);
    let role = 3;
    if (idAuth === res.id) {
      role = 0;
    }
    yield put({type: GET_ME_SUCCESS, payload: {user: res, role}});
    yield put({type: GET_POST_PROFILE_SUCCESS, payload: {posts}});
  } catch (e) {
    console.log(e);
  } finally {
    yield put({type: PROFILE_CHANGE_STATE, payload: {loading: false}});
  }
}

function* updateMeSaga({payload}) {
  let payloadtmp = payload;
  try {
    yield put({type: PROFILE_CHANGE_STATE, payload: {loading: true}});
    if (payload.avatar) {
      const url = yield call(uploadImg, payload.avatar);
      yield put({
        type: CREATE_POST,
        payload: {image: payload.avatar, text: ''},
      });
      payloadtmp.avatar = url;
    }
    if (payload.background) {
      const url = yield call(uploadImg, payload.background);
      yield put({
        type: CREATE_POST,
        payload: {image: payload.background, text: ''},
      });
      payloadtmp.background = url;
    }
    const res = yield call(updateMe, payload);
    yield put({type: GET_ME, payload: auth().currentUser.uid});
  } catch (e) {
  } finally {
    yield put({type: PROFILE_CHANGE_STATE, payload: {loading: false}});
  }
}

function* getProfileSaga({payload}) {
  try {
    yield put({type: PROFILE_CHANGE_STATE, payload: {loading: true}});
    const [res, posts] = yield all([
      call(getProfile, payload),
      call(getPostMe, payload),
    ]);
    yield put({type: GET_POST_PROFILE_SUCCESS, payload: {postsProfile: posts}});
    yield put({type: GET_PROFILE_SUCCESS, payload: {profile: res}});
  } catch (e) {
    console.log(e);
  } finally {
    yield put({type: PROFILE_CHANGE_STATE, payload: {loading: false}});
  }
}

function* watchProfileSaga() {
  yield takeEvery(GET_ME, getMeSaga);
  yield takeEvery(GET_PROFILE, getProfileSaga);
  yield takeEvery(UPDATE_ME, updateMeSaga);
}
export default watchProfileSaga;

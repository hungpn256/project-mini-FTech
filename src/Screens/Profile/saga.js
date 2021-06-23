import {uploadImg} from '*/Helper/function';
import auth from '@react-native-firebase/auth';
import {
  all,
  call,
  delay,
  put,
  select,
  takeEvery,
} from '@redux-saga/core/effects';
import {GET_FRIEND} from '../Friend/constants';
import {CREATE_POST} from '../Home/constants';
import {
  ACCEPT_FRIEND,
  ADD_FRIEND,
  GET_ME,
  GET_POST_PROFILE_SUCCESS,
  GET_PROFILE,
  GET_PROFILE_SUCCESS,
  PROFILE_CHANGE_STATE,
  REMOVE_FRIEND,
  UPDATE_ME,
} from './constants';
import {
  acceptFriend,
  addFriend,
  getPostMe,
  getProfile,
  removeFriend,
  updateMe,
  uploadPost,
} from './service';
function* getMeSaga({payload}) {
  try {
    yield put({type: PROFILE_CHANGE_STATE, payload: {loadingPost: true}});
    const [posts] = yield all([call(getPostMe, payload)]);
    yield put({type: GET_POST_PROFILE_SUCCESS, payload: {posts}});
  } catch (e) {
    console.log(e);
  } finally {
    yield put({type: PROFILE_CHANGE_STATE, payload: {loadingPost: false}});
  }
}

function* updateMeSaga({payload}) {
  let payloadtmp = payload;
  try {
    yield put({
      type: PROFILE_CHANGE_STATE,
      payload: {editing: true, updateSuccess: false},
    });
    if (payload.avatar) {
      const url = yield call(uploadImg, payload.avatar);
      yield call(uploadPost, {image: url, text: ''});
      payloadtmp.avatar = url;
    }
    if (payload.background) {
      const url = yield call(uploadImg, payload.background);
      yield call(uploadPost, {image: url, text: ''});
      payloadtmp.background = url;
    }
    const res = yield call(updateMe, payload);
    yield put({type: GET_ME, payload: auth().currentUser.uid});
    yield put({
      type: PROFILE_CHANGE_STATE,
      payload: {updateSuccess: true},
    });
  } catch (e) {
    console.log('update fail', e);
  } finally {
    yield put({
      type: PROFILE_CHANGE_STATE,
      payload: {editing: false},
    });
  }
}

function* getProfileSaga({payload}) {
  try {
    yield put({type: PROFILE_CHANGE_STATE, payload: {loading: true}});
    const [res, posts] = yield all([
      call(getProfile, payload),
      call(getPostMe, payload),
    ]);
    const user = yield select(state => state.auth.user);
    const [fr1, fr2] = yield all([res.friend.get(), user.friend.get()]);
    const [datafr1, datafr2] = [fr1.data(), fr2.data()];
    let role = 1;
    if (datafr1.accepted.includes(user.id)) {
      role = 4;
    } else if (datafr2.pending.includes(res.id)) {
      role = 3;
    } else if (datafr1.pending.includes(user.id)) {
      role = 2;
    }
    yield put({
      type: GET_POST_PROFILE_SUCCESS,
      payload: {postsProfile: posts},
    });
    yield put({type: GET_PROFILE_SUCCESS, payload: {profile: res, role}});
  } catch (e) {
    console.log(e, 'prfi');
  } finally {
    yield put({type: PROFILE_CHANGE_STATE, payload: {loading: false}});
  }
}

function* addFriendSaga({payload}) {
  try {
    yield call(addFriend, payload);
    yield put({type: GET_FRIEND});
  } catch (e) {
    console.log(e);
  }
}

function* RemoveFriendSaga({payload}) {
  try {
    yield call(removeFriend, payload);
    yield put({type: GET_FRIEND});
  } catch (e) {
    console.log(e);
  }
}

function* acceptFriendSaga({payload}) {
  try {
    yield call(acceptFriend, payload);
    yield put({type: GET_FRIEND});
  } catch (e) {
    console.log(e);
  }
}

function* watchProfileSaga() {
  yield takeEvery(GET_ME, getMeSaga);
  yield takeEvery(GET_PROFILE, getProfileSaga);
  yield takeEvery(UPDATE_ME, updateMeSaga);
  yield takeEvery(ADD_FRIEND, addFriendSaga);
  yield takeEvery(REMOVE_FRIEND, RemoveFriendSaga);
  yield takeEvery(ACCEPT_FRIEND, acceptFriendSaga);
}
export default watchProfileSaga;

import {
  call,
  put,
  takeLatest,
  takeEvery,
  select,
} from '@redux-saga/core/effects';
import {uploadImg} from '../../Helper/function';
import {
  CREATE_CONVERSATION,
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_USER_BY_NAME,
  GET_USER_BY_NAME_SUCCESS,
  GET_CONVERSATION_FAILURE,
  CREATE_CONVERSATION_SUCCESS,
  SEND_MESSAGE,
  MARK_READ,
} from './constants';
import {
  createConversation,
  getConversation,
  getUserByName,
  markUnread,
  sendMes,
  markRead,
} from './service';
import auth from '@react-native-firebase/auth';

function* getUserByNameSaga({payload}) {
  try {
    const users = yield call(getUserByName, payload);
    yield put({type: GET_USER_BY_NAME_SUCCESS, payload: users});
  } catch (e) {
    console.log(e);
  }
}

function* getConversationSaga({payload}) {
  try {
    const res = yield call(getConversation, payload);
    yield put({type: GET_CONVERSATION_SUCCESS, payload: res});
  } catch (e) {
    yield put({type: GET_CONVERSATION_FAILURE, payload: {}});
    console.log(e);
  }
}

function* createConversationSaga({payload}) {
  try {
    const res = yield call(createConversation, payload);
    yield put({type: CREATE_CONVERSATION_SUCCESS, payload: res});
  } catch (e) {
    console.log(e, 'room-create-fail');
  }
}

function* sendMesSaga({payload}) {
  try {
    if (payload.messages[0].image) {
      const url = yield call(uploadImg, payload.messages[0].image);
      payload.messages[0].image = url;
    }
    const res = yield call(sendMes, payload);
    const user = yield select(
      state => state.chat.conversation[payload.roomId].users,
    );
    const oUser = user.find(user => user.id !== auth().currentUser.uid);
    console.log(oUser, 'o');
    yield call(markUnread, {roomId: payload.roomId, uid: oUser.id});
  } catch (e) {
    console.log('err send mes', e);
  }
}

function* markReadSaga({payload}) {
  try {
    yield call(markRead, {roomId: payload.roomId, uid: auth().currentUser.uid});
  } catch (e) {
    console.log('mark read mes', e);
  }
}

function* watchChatSaga() {
  yield takeLatest(GET_USER_BY_NAME, getUserByNameSaga);
  yield takeLatest(GET_CONVERSATION, getConversationSaga);
  yield takeLatest(CREATE_CONVERSATION, createConversationSaga);
  yield takeEvery(SEND_MESSAGE, sendMesSaga);
  yield takeEvery(MARK_READ, markReadSaga);
}
export default watchChatSaga;

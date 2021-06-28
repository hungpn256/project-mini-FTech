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
  SEND_MESSAGE_SUCCESS,
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
import {notiMes} from '../Notification/service';

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
    yield put({type: SEND_MESSAGE_SUCCESS, payload});
    yield call(sendMes, payload);
    const user = yield select(
      state => state.chat.conversation[payload.roomId].users,
    );
    const oUser = user.find(user => user.id !== auth().currentUser.uid);
    yield call(markUnread, {roomId: payload.roomId, uid: oUser.id});
    if (user.token && user.token.length > 0) {
      yield call(notiMes, {
        title: `${user.name} đã gửi tin nhắn cho bạn`,
        body: payload.messages[0].image
          ? 'bạn đã nhận được 1 hình ảnh'
          : payload.messages[0].text,
        token: oUser.token[0],
      });
    }
    console.log('send done');
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

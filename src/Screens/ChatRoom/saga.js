import {call, put, takeLatest, takeEvery} from '@redux-saga/core/effects';
import {
  CREATE_CONVERSATION,
  GET_CONVERSATION,
  GET_CONVERSATION_SUCCESS,
  GET_USER_BY_NAME,
  GET_USER_BY_NAME_SUCCESS,
  GET_CONVERSATION_FAILURE,
  CREATE_CONVERSATION_SUCCESS,
  SEND_MESSAGE,
} from './constants';
import {
  createConversation,
  getConversation,
  getUserByName,
  sendMes,
} from './service';
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
    console.log(res, 'get - room');
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
    const res = yield call(sendMes, payload);
  } catch (e) {
    console.log('err send mes', e);
  }
}

function* watchChatSaga() {
  yield takeLatest(GET_USER_BY_NAME, getUserByNameSaga);
  yield takeLatest(GET_CONVERSATION, getConversationSaga);
  yield takeLatest(CREATE_CONVERSATION, createConversationSaga);
  yield takeEvery(SEND_MESSAGE, sendMesSaga);
}
export default watchChatSaga;

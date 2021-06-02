import {call, delay, put, takeLatest} from '@redux-saga/core/effects';
import {GET_USER_BY_NAME, GET_USER_BY_NAME_SUCCESS} from './constants';
import {getUserByName} from './service';
function* getUserByNameSaga({payload}) {
  try {
    const users = yield call(getUserByName, payload);
    yield put({type: GET_USER_BY_NAME_SUCCESS, payload: users});
  } catch (e) {
    console.log(e);
  }
}

function* watchChatSaga() {
  yield takeLatest(GET_USER_BY_NAME, getUserByNameSaga);
}
export default watchChatSaga;

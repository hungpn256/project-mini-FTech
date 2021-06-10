import {call, put, takeLatest} from '@redux-saga/core/effects';

import {USERINFO_DATA, USERINFO_SEARCH} from './constants';

import {search} from './service';
function* searchUser({payload}) {
  try {
    const res = yield call(search, payload);
    yield put({type: USERINFO_DATA, payload: {userSearch: res}});
  } catch (error) {
    console.log(error);
  }
}

function* watchSearchSaga() {
  yield takeLatest(USERINFO_SEARCH, searchUser);
}

export default watchSearchSaga;

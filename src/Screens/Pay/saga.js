import {takeLatest, call} from 'redux-saga/effects';
import {RECHARGE_MONEY} from './constaints';
import {rechargeMoney} from './service';

function* rechargeMoneySaga({payload}) {
  try {
    console.log('sdasd');
    const res = yield call(rechargeMoney, payload);
  } catch (e) {
    console.log(e);
  }
}

function* watchPostSaga() {
  yield takeLatest(RECHARGE_MONEY, rechargeMoneySaga);
}
export default watchPostSaga;

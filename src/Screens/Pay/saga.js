import {takeLatest, call} from 'redux-saga/effects';
import {RECHARGE_MONEY, WITHDRAW_MONEY} from './constaints';
import {rechargeMoney, withdrawMoney} from './service';

function* rechargeMoneySaga({payload}) {
  try {
    const res = yield call(rechargeMoney, payload);
  } catch (e) {
    console.log(e);
  }
}
function* withdrawMoneySaga({payload}) {
  try {
    const res = yield call(withdrawMoney, payload);
  } catch (e) {
    console.log(e);
  }
}

function* paySaga() {
  yield takeLatest(RECHARGE_MONEY, rechargeMoneySaga);
  yield takeLatest(WITHDRAW_MONEY, withdrawMoneySaga);
}
export default paySaga;

import {takeLatest, call, put} from 'redux-saga/effects';
import {
  RECHARGE_MONEY,
  RECHARGE_MONEY_SUCCESS,
  WALLET_CHANGE_STATE,
} from './constaints';
import {rechargeMoney} from './service';

function* rechargeMoneySaga({payload}) {
  try {
    yield put({type: WALLET_CHANGE_STATE, payload: {rechargeSuccess: true}});
    yield call(rechargeMoney, payload);
    yield put({type: RECHARGE_MONEY_SUCCESS, payload});
  } catch (e) {
    console.log(e);
  } finally {
    yield put({type: WALLET_CHANGE_STATE, payload: {rechargeSuccess: false}});
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

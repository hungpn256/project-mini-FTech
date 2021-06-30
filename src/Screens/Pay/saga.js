import {takeLatest, call, put} from 'redux-saga/effects';
import {
  RECHARGE_MONEY,
  RECHARGE_MONEY_SUCCESS,
  WALLET_CHANGE_STATE,
  WITHDRAW_MONEY,
  WITHDRAW_MONEY_SUCCESS,
  ALL_USER_WALLET,
  ALL_USER_WALLET_SUCCESS,
} from './constaints';
import {rechargeMoney, withdrawMoney, getUsers} from './service';

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
    yield put({type: WALLET_CHANGE_STATE, payload: {rechargeSuccess: true}});
    yield call(withdrawMoney, payload);
    yield put({type: WITHDRAW_MONEY_SUCCESS, payload});
  } catch (e) {
    console.log(e);
  } finally {
    yield put({type: WALLET_CHANGE_STATE, payload: {withdrawSuccess: false}});
  }
}

function* getAllUserWallet() {
  try {
    const res = yield call(getUsers);
    console.log(res + 'all user wallet');
    yield put({type: ALL_USER_WALLET_SUCCESS, payload: {res: res}});
  } catch (error) {
    console.log(error);
  }
}

function* paySaga() {
  yield takeLatest(RECHARGE_MONEY, rechargeMoneySaga);
  yield takeLatest(WITHDRAW_MONEY, withdrawMoneySaga);
  yield takeLatest(ALL_USER_WALLET, getAllUserWallet);
}
export default paySaga;

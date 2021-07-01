import {takeLatest, call, put} from 'redux-saga/effects';
import {Alert} from 'react-native';
import {
  RECHARGE_MONEY,
  RECHARGE_MONEY_SUCCESS,
  WALLET_CHANGE_STATE,
  WITHDRAW_MONEY,
  WITHDRAW_MONEY_SUCCESS,
  ALL_USER_WALLET,
  ALL_USER_WALLET_SUCCESS,
  WALLET_TRANSFER,
  WALLET_TRANSFER_SUCCESS,
  CLOSE_MODAL_USER,
} from './constaints';
import {
  rechargeMoney,
  withdrawMoney,
  getUsers,
  transfersMoney,
  received,
} from './service';

import {notiMes} from '../Notification/service';

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

function* transferMoneySaga({payload}) {
  yield put({type: WALLET_CHANGE_STATE, payload: {tranferSuccess: true}});
  try {
    yield call(transfersMoney, payload);
    yield put({type: WALLET_TRANSFER_SUCCESS});
    if (payload.token && payload.token.length > 0) {
      console.log(payload.token + 'tokennnnnnnnnnnn');
      yield call(notiMes, {
        title: `${payload.senderName} đã chuyển khoản cho bạn ${payload.moneyReceived} đ`,
        body: payload.content.length > 0 ? payload.content : 'Ting ting !',
        token: payload.token,
      });
    }
  } catch (error) {
    console.log(error);
  } finally {
    yield put({type: WALLET_CHANGE_STATE, payload: {tranferSuccess: false}});
    yield put({type: CLOSE_MODAL_USER});
    Alert.alert('Notification', 'Money transfer success');
    yield call(received, payload);
  }
}

function* paySaga() {
  yield takeLatest(RECHARGE_MONEY, rechargeMoneySaga);
  yield takeLatest(WITHDRAW_MONEY, withdrawMoneySaga);
  yield takeLatest(ALL_USER_WALLET, getAllUserWallet);
  yield takeLatest(WALLET_TRANSFER, transferMoneySaga);
}
export default paySaga;

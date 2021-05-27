import {all} from 'redux-saga/effects';
import watchLoginSaga from './Screens/Auth/saga';
function* rootSaga() {
  yield all([watchLoginSaga()]);
}
export default rootSaga;

import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../index_Reducer';
import rootSaga from '../index_Saga';
import {composeWithDevTools} from 'remote-redux-devtools';

const sagaMiddleware = createSagaMiddleware();
const configureStore = () => {
  const middleware = [sagaMiddleware];
  const enhancers = [applyMiddleware(...middleware)];
  const store = createStore(rootReducer, composeWithDevTools(...enhancers));
  sagaMiddleware.run(rootSaga);
  return store;
};
export default configureStore;

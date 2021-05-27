import {applyMiddleware, compose, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '../index_Reducer';
import rootSaga from '../index_Saga';
import logger from 'redux-logger';
const sagaMiddleware = createSagaMiddleware();
const configureStore = () => {
  const middleware = [sagaMiddleware, logger];
  const enhancers = [applyMiddleware(...middleware)];
  const store = createStore(rootReducer, compose(...enhancers));
  sagaMiddleware.run(rootSaga);
  return store;
};
export default configureStore;

import {
  applyMiddleware,
  createStore
} from 'redux';
import sagaMiddlewareFactory from 'redux-saga';
import reduxMiddleware from 'react-block-ui/lib/reduxMiddleware';
import { appReducer } from './reducers';
import sagas from './sagas';

const sagaMiddleware = sagaMiddlewareFactory();

const store = createStore(
  appReducer,
  applyMiddleware(sagaMiddleware, reduxMiddleware)
);

sagaMiddleware.run(sagas);

export default store;
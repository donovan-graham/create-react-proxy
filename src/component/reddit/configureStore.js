import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// import thunkMiddleware from 'redux-thunk';
// import { createLogger } from 'redux-logger';
import rootReducer from './rootReducer';

import createSagaMiddleware from 'redux-saga';

// const loggerMiddleware = createLogger();
const sagaMiddleware = createSagaMiddleware();

// const middleware = [sagaMiddleware, loggerMiddleware];
const middleware = [sagaMiddleware];

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middleware)));
  return { store, sagaMiddleware };
}

import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './rootReducer';
import createSagaMiddleware from 'redux-saga';

const sagaMiddleware = createSagaMiddleware();

const middleware = [sagaMiddleware];

export default function configureStore(preloadedState) {
  const store = createStore(rootReducer, preloadedState, composeWithDevTools(applyMiddleware(...middleware)));
  return { store, sagaMiddleware };
}

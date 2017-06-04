import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route } from 'react-router-dom';

import configureStore from './configureStore';

import AsyncApp from './AsyncApp';
import watchSaga from '../../hoc/sagas';

const { store, sagaMiddleware } = configureStore();
sagaMiddleware.run(...watchSaga);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Route exact path="/" component={AsyncApp} />
        </BrowserRouter>
      </Provider>
    );
  }
}

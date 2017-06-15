import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Link } from 'react-router-dom';

import configureStore from './configureStore';

import Reddit from './component/reddit/container';
import Dashboard from './component/dashboard/component';
import watchSaga from './hoc/sagas';

const { store, sagaMiddleware } = configureStore();
sagaMiddleware.run(...watchSaga);

export default class Root extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <div>
            <ul>
              <li><Link to="/">Reddit</Link></li>
              <li><Link to="/dashboard">Dashboard</Link></li>
            </ul>

            <Route exact path="/" component={Reddit} />
            <Route path="/dashboard" component={Dashboard} />
          </div>
        </BrowserRouter>
      </Provider>
    );
  }
}

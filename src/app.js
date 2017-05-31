import React from 'react';
import Button from './component/button';

import Hello from './hoc/hello';

import logo from './logo.svg';
import './app.css';

const App = () => (
  <div className="app">
    <div className="app-header">
      <img src={logo} className="app-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
    <p className="app-intro">
      To get started, edit <code>src/app.js</code> and save to reload.
      <Button>Click me</Button>
    </p>
    <Hello name={'bob'} age={30} url={'http://api.com'} />
  </div>
);

export default App;

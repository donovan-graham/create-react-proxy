import React from 'react';
import Button from './component/button';
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
  </div>
);

export default App;

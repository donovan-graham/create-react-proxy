import React from 'react';
import ReactDOM from 'react-dom';
// import App from './app';
import Root from './components/redit/Root';
import registerServiceWorker from './registerServiceWorker';
import './index.css';

ReactDOM.render(<Root />, document.getElementById('root'));
registerServiceWorker();

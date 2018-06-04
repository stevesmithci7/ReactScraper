import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import Main from './components/children/main.jsx';

// Renders the bundle of components to display them in the DOM
reactDOM.render(<Main />, document.getElementById('app'));

// ReactDOM.render(<App />, document.getElementById('app'));
registerServiceWorker();

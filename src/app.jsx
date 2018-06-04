// The primary dependencies for the configuration of the site
const react = require('react');
const reactDOM = require('react-dom');

// Request for Main component to bundle all jsx files for site manipulation
var mMin = require('./components/children/main.jsx');

// Renders the bundle of components to display them in the DOM
reactDOM.render(<Main />, document.getElementById('app'));
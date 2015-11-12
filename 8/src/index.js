const React = require('react');
const { render } = require('react-dom');
const ChatApp = require('./ChatApp');

require('./reset.css');
require('./style.css');

render(<ChatApp />, document.getElementById('root'));

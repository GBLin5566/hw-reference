const React = require('react');
const { render } = require('react-dom');
const TodoApp = require('./TodoApp');
require('todomvc-common/base.css');
require('todomvc-app-css/index.css');
require('./todo.css');

render(<TodoApp />, document.getElementById('root'));

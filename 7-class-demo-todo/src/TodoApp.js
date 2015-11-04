const React = require('react');
const TodoItem = require('./TodoItem');
const CountDisplay = require('./CountDisplay');
const Rebase = require('re-base');
const base = Rebase.createClass('https://web-todo.firebaseio.com');

// TodoApp: 原本的 HTML
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todos: []
    };
  }

  componentDidMount() {
    this.ref = base.syncState(`todos`, {
      context: this,
      state: 'todos',
      asArray: true
    });
  }

  componentWillUnmount() {
    base.removeBinding(this.ref);
  }

  // 處理 todo 改變的事件
  handleNewTodoChange(event) {
    this.setState({ newTodo: event.target.value });
  }

  // 處理 input 發生鍵盤按鍵按下去的事件
  handleKeyDown(event) {
    const inputValue = event.target.value;
    if (event.keyCode == 13 && inputValue !== '') {
      const { todos, newTodo } = this.state;
      // 新增 todo 並清掉 input
      this.setState({
        newTodo: '',
        todos: todos.concat({ title: newTodo, isCompleted: false })
      });
    }
  }

  handleTodoChange(event, i) {
    const { todos } = this.state;
    todos.splice(i, 1, {
      title: todos[i].title,
      isCompleted: event.target.checked
    });
    this.setState({
      todos: todos
    });
  }

  handleTodoDestory(i) {
    let { todos } = this.state;
    todos.splice(i, 1);
    this.setState({
      todos: todos
    });
  }

  renderTodoItem(item, i) {
    return (
      <TodoItem
        key={i}
        index={i}
        title={item.title}
        isCompleted={item.isCompleted}
        onChange={this.handleTodoChange.bind(this)}
        onDestroy={this.handleTodoDestory.bind(this)}
      />
    );
  }

  render() {
    const { newTodo, todos } = this.state;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <input
              className="new-todo"
              placeholder="What needs to be done?"
              autofocus
              value={newTodo}
              onChange={this.handleNewTodoChange.bind(this)}
              onKeyDown={this.handleKeyDown.bind(this)}
            />
          </header>
          <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">{todos.map(this.renderTodoItem, this)}</ul>
          </section>
          <footer className="footer">
            <CountDisplay count={todos.filter(t => !t.isCompleted).length} />
            <button className="clear-completed">Clear completed</button>
          </footer>
        </section>
        <footer className="info">
          <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
        </footer>
      </div>
    );
  }
}

module.exports = TodoApp;

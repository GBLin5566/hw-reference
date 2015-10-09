// TodoApp: 原本的 HTML
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todos: []
    };
  }

  renderTodoItem(item) {
    return <TodoItem title={item.title} isCompleted={item.isCompleted} />
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
            />
          </header>
          <section className="main">
            <input className="toggle-all" type="checkbox" />
            <label htmlFor="toggle-all">Mark all as complete</label>
            <ul className="todo-list">{todos.map(this.renderTodoItem)}</ul>
          </section>
          <footer className="footer">
            <span className="todo-count"></span>
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


// todo 項目
class TodoItem extends React.Component {
  render() {
    const { title, isCompleted } = this.props;
    return (
      <li>
        <div className="view">
          <input className="toggle" type="checkbox" checked={isCompleted} />
          <label>{title}</label>
          <button className="destroy"></button>
        </div>
      </li>
    );
  }
}

TodoItem.PropTypes = {
  title: React.PropTypes.string,
  isCompleted: React.PropTypes.bool
};


// 更新 count 顯示
class CountDisplay extends React.Component {
  render() {
    const { count } = this.props;
    if (count > 1) {
      return <span><strong>{count}</strong> items left</span>;
    } else if (count === 1) {
      return <span><strong>1</strong>item left</span>;
    } else {
      return <span>no item</span>;
    }
  }
}

CountDisplay.propTypes = {
  count: React.PropTypes.number
};

// 初始化 counter
CountDisplay.defaultProps = {
  count: 0
};


ReactDOM.render(<TodoApp />, document.getElementById('root'));

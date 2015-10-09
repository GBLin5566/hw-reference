// TodoApp: 原本的 HTML
class TodoApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newTodo: '',
      todos: []
    };
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
    const { index, title, isCompleted, onChange, onDestroy } = this.props;
    return (
      <li>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={isCompleted}
            onChange={(event) => onChange(event, index)}
          />
          <label>{title}</label>
          <button className="destroy" onClcik={(event) => onDestroy(index)}></button>
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

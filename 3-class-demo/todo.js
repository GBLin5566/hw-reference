// TodoApp: 原本的 HTML
class TodoApp extends React.Component {

  renderTodoItem(item) {
    return <TodoItem title={item.title} isCompleted={item.isCompleted} />
  }

  render() {
    return (
      <div>
        <section class="todoapp">
          <header class="header">
            <h1>todos</h1>
            <input class="new-todo" placeholder="What needs to be done?" autofocus />
          </header>
          <section class="main">
            <input class="toggle-all" type="checkbox" />
            <label for="toggle-all">Mark all as complete</label>
            <ul class="todo-list"></ul>
          </section>
          <footer class="footer">
            <span class="todo-count"></span>
            <button class="clear-completed">Clear completed</button>
          </footer>
        </section>
        <footer class="info">
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
          <input class="toggle" type="checkbox" checked={isCompleted} />
          <label>{title}</label>
          <button class="destroy"></button>
        </div>
      </li>
    );
  }
}

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

// 初始化 counter
CountDisplay.defaultProps = {
  count: 0
};


ReactDOM.render(<TodoApp />, document.getElementById('root'));

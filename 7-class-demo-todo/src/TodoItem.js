const React = require('react');

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
          <button className="destroy" onClick={(event) => onDestroy(index)}></button>
        </div>
      </li>
    );
  }
}

TodoItem.propTypes = {
  title: React.PropTypes.string,
  isCompleted: React.PropTypes.bool
};

module.exports = TodoItem;

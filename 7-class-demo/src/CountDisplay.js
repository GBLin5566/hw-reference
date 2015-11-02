const React = require('react');

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

module.exports = CountDisplay;

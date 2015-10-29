const React = require('react');

class MessageItem extends React.Component {
  render() {
    const { fromMe, text } = this.props;
    return (
      <div className={`message-item ${fromMe ? 'message-from-me' : 'message-from-other'}`}>
        <span>{text}</span>
      </div>
    );
  }
}

module.exports = MessageItem;

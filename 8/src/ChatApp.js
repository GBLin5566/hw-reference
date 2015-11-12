const React = require('react');
const ThreadItem = require('./ThreadItem');
const MessageItem = require('./MessageItem');
const Rebase = require('re-base');
const base = Rebase.createClass('https://web-chatapp.firebaseio.com');

const initialState = {
  newMessage: '',
  threads: [],
  currentIndex: 0
};


// ChatApp: 原本的 HTML
class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
  }

  componentDidMount() {
    this.ref = base.syncState(`threads`, {
      context: this,
      state: 'threads',
      asArray: true
    });
  }

  componentWillUnmount(){
    base.removeBinding(this.ref);
  }

  handleThreadItemClick(index) {
    this.setState({
      currentIndex: index
    });
  }

  handleNewMessageChange(event) {
    this.setState({
      newMessage: event.target.value
    })
  }

  handleInputKeyDown(event) {
    const inputValue = event.target.value;
    if (event.keyCode == 13 && inputValue !== '') {
      const { newMessage, threads, currentIndex } = this.state;
      const now = new Date();
      threads[currentIndex].messages.push({
        fromMe: true,
        text: newMessage,
        time: `${now.getHours()}:${now.getMinutes()}`
      });
      // 新增 message 並清掉 input
      this.setState({
        newMessage: '',
        threads: threads
      });
    }
  }

  renderThreadItem(thread, i) {
    const { target, messages } = thread;
    const lastMessage = messages[messages.length - 1];
    return (
      <ThreadItem
        key={i}
        src={target.profilePic}
        name={target.name}
        content={lastMessage.text}
        time={lastMessage.time}
        onClick={this.handleThreadItemClick.bind(this, i)}
      />
    );
  }

  renderMessageItem(msg, i) {
    return (
      <MessageItem
        key={i}
        fromMe={msg.fromMe}
        text={msg.text}
      />
    );
  }

  render() {
    const { newMessage, threads, currentIndex } = this.state;
    const targetThread = threads[currentIndex];
    const targetName = (targetThread && targetThread.target.name) || 'Loading...';
    const messages = (targetThread && targetThread.messages) || [];
    return (
      <div className="chat-app clearfix">
        <div className="chat-app_left">
          <div className="heading">
            <h3 className="messenger-title">Messager</h3>
          </div>
          <div className="thread-list">
            {threads.map(this.renderThreadItem, this)}
          </div>
        </div>
        <div className="chat-app_right">
          <div className="heading">
            <div className="current-target">{targetName}</div>
          </div>
          <div className="message-list">
            {messages.map(this.renderMessageItem, this)}
          </div>
          <div className="footer">
            <input
              className="new-message"
              type="text"
              value={newMessage}
              onChange={this.handleNewMessageChange.bind(this)}
              onKeyDown={this.handleInputKeyDown.bind(this)}
            />
          </div>
        </div>
      </div>
    );
  }
}

module.exports = ChatApp;

const initialState = {
  newMessage: '',
  threads: [
    {
      target: {
        name: 'Elsa',
        profilePic: 'http://lorempixel.com/50/50/people/1'
      },
      messages: [
        { fromMe:false, text: '對啊', time: '12:27' },
        { fromMe:false, text: '試著', time: '12:27' },
        { fromMe:false, text: '靠左邊嘛', time: '12:27' },
        { fromMe:true, text: '換我了', time: '12:27' },
        { fromMe:true, text: '有看到嗎', time: '12:27' },
      ]
    },
    {
      target: {
        name: 'Katharine',
        profilePic: 'http://lorempixel.com/50/50/people/9'
      },
      messages: [
        { fromMe:false, text: '對啊', time: '12:27' },
      ]
    },
    {
      target: {
        name: 'Marshall',
        profilePic: 'http://lorempixel.com/50/50/people/7'
      },
      messages: [
        { fromMe:false, text: '對啊', time: '12:27' },
      ]
    }
  ],
  currentIndex: 0
};


// ChatApp: 原本的 HTML
class ChatApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = initialState;
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
    const targetName = targetThread.target.name;
    const messages = targetThread.messages;
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

class ThreadItem extends React.Component {
  render() {
    const { src, name, content, time, onClick } = this.props;
    return (
      <li className="thread-item" onClick={onClick}>
        <div className="clearfix">
          <div className="thread-item_left">
            <img className="img-circle" src={src} alt="" className="img" />
          </div>
          <div className="thread-item_right">
            <div className="thread-from">
              {name}
            </div>
            <div>
              <span className="thread-content">{content}</span>
            </div>
            <span className="thread-time">{time}</span>
          </div>
        </div>
      </li>
    );
  }
}

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

ReactDOM.render(<ChatApp />, document.getElementById('root'));

import React, { Component } from "react";
import io from "socket.io-client";
import { connect } from "react-redux";

class ChatRoom extends Component {
  constructor() {
    super();

    this.state = {
      message: "",
      messages: [],
      room: "",
      date: ""
    };
  }

  componentDidMount() {
    this.setSocketListeners();
    this.startChat();
    this.socket.on("startChat", messages => {
      this.chatStarted(messages);
    });

    // this.socket.on("updateMsg", messages => {
    //   this.updateMsg(messages);
    // });
  }

  //   updateMsg = messages => {
  //     this.setState({
  //       messages: messages,
  //       message: ""
  //     });

  chatStarted = messages => {
    this.setState({
      messages: messages
    });
  };

  setSocketListeners = () => {
    this.socket = io();

    this.socket.on("sendMsg", messages => {
      this.setState({
        messages,
        message: ""
      });
    });
  };

  startChat = () => {
    this.socket.emit("endChat", this.state.chat);
    const viewedUserId = +this.props.match.params.id;
    const { id } = this.props;

    let greater;
    let lesser;

    if (viewedUserId > id) {
      greater = viewedUserId;
      lesser = id;
    } else {
      greater = id;
      lesser = viewedUserId;
    }

    const chatRoomId = greater + ":" + lesser;
    this.setState({
      room: chatRoomId
    });

    this.socket.emit("startChat", { chatRoomId, viewedUserId, id });
  };

  handleMessage = value => {
    this.setState({
      message: value
    });
  };

  sendMsg = () => {
    let date = new Date();

    this.socket.emit("sendMsg", {
      room: this.state.room,
      message: this.state.message,
      user_1: this.props.id,
      date: date
    });
  };

  render() {
    const messages = this.state.messages.map(obj => obj.message);
    return (
      <div>
        {messages}
        <input
          value={this.state.message}
          onChange={e => {
            this.handleMessage(e.target.value);
          }}
        />
        <button onClick={this.sendMsg}>Send Message!</button>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.auth_reducer.id
  };
};

export default connect(mapStateToProps)(ChatRoom);

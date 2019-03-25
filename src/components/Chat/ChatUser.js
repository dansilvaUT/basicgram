import React, { Component } from "react";

class ChatUser extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log("hit chatuser", this.props.user);
    const { username, profile_pic, first_name, last_name } = this.props.user;
    return (
      <div className="chat-user-container">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "50%"
          }}
        >
          <div className="post-profile-pic-container">
            <img
              className="post-profile-pic"
              padding="0"
              width="90%"
              height="90%"
              src={profile_pic}
            />
          </div>
          <div>
            <div style={{ margin: "0", fontWeight: "bold" }}>{username}</div>
            <div>
              {first_name} {last_name}
            </div>
          </div>
        </div>
        <div className="start-chat-button-container">
          <button className="start-chat-button">Start Chat!</button>
        </div>
      </div>
    );
  }
}

export default ChatUser;

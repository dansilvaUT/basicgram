import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      comment: this.props.comment.comment
    };
  }

  render() {
    console.log("displaying comment", this.props.comment);
    const { username } = this.props.comment.username;
    const { comment } = this.state;
    return (
      <div className="comment">
        <div>{username}</div>
        <div className="comment-contents">{comment}</div>
      </div>
    );
  }
}

export default Comment;

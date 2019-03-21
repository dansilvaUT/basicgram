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
    console.log("displaying comment");
    const { comment } = this.state;
    return <div>{comment}</div>;
  }
}

export default Comment;

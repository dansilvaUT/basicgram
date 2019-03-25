import React, { Component } from "react";
import { connect } from "react-redux";
import axios from "axios";
import DeleteCommentButton from "../../Buttons/DeleteCommentButton";
import SaveCommentButton from "../../Buttons/SaveCommentButton";
import EditCommentButton from "../../Buttons/EditCommentButton";

class Comment extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      comment: this.props.comment.comment
    };
  }

  render() {
    console.log(this.props.comment);
    const { username, profile_pic } = this.props.comment;
    const { comment } = this.state;
    return (
      <div className="comment">
        {this.editing ? (
          <input value={this.state.comment} />
        ) : (
          <div style={{ padding: "2px", paddingLeft: "6px" }}>
            <div className="comment-contents">
              <div style={{ display: "flex", alignItems: "center" }}>
                <div className="comment-profile-pic-container">
                  <img
                    width="28px"
                    height="28px"
                    className="comment-profile-pic"
                    src={profile_pic}
                  />
                </div>
                <div style={{ fontWeight: "bold", marginLeft: "3px" }}>
                  {username}
                </div>
              </div>
              <div>{comment}</div>
              <div style={{ display: "flex", justifyContent: "flex-end" }}>
                <div style={{ marginRight: "5px" }}>
                  <EditCommentButton />
                </div>
                <div>
                  <DeleteCommentButton />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Comment;

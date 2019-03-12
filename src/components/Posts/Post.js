import React, { Component } from "react";
import axios from "axios";
import LikeButton from "../Buttons/LikeButton";
import CommentButton from "../Buttons/CommentButton";

class Post extends Component {
  render() {
    const { img_url, post_id, username, profile_pic } = this.props.post;

    return (
      <div
        style={{
          borderBottomWidth: "1px",
          borderBottomColor: "black",
          borderBottomStyle: "ridge"
        }}
      >
        <div className="post-header-content">
          <div
            style={{ display: "flex", alignItems: "center", height: "40px" }}
          >
            <div className="post-profile-pic">
              <img padding="0" width="90%" height="90%" src={profile_pic} />
            </div>
            {username}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <p>...</p>
          </div>
        </div>
        <img alt={post_id} src={img_url} width="100%" height="300px" />
        <div
          className="post-footer-content"
          style={{ display: "flex", alignItems: "center", height: "40px" }}
        >
          <LikeButton />
          <CommentButton />
        </div>
        <div>{username} and a comment</div>
      </div>
    );
  }
}

export default Post;

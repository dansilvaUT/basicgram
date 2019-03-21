import React, { Component } from "react";
import axios from "axios";
import LikeButton from "../Buttons/LikeButton";
import CommentButton from "../Buttons/CommentButton";
import DeletePostButton from "../Buttons/DeletePostButton";
import EditCaptionButton from "../Buttons/EditCaptionButton";
import EllipsisMenuButton from "../Buttons/EllipsisMenuButton";
import SaveButton from "../Buttons/SaveButton";
import { updatePosts } from "../.././ducks/reducers/post_reducer";
import { selectPostID } from "../.././ducks/reducers/comment_reducer";
import { connect } from "react-redux";
import { Route } from "react-router-dom";

class Post extends Component {
  constructor(props) {
    super(props);

    this.state = {
      editing: false,
      caption: this.props.post.caption
      // loading: true
    };
  }

  handleChange = e => {
    this.setState({
      caption: e.target.value
    });
  };

  handleEditToggle = () => {
    this.setState({
      editing: !this.state.editing
    });
  };

  handleSubmitEdit = () => {
    const { caption } = this.state;
    const { post_id } = this.props.post;
    axios.put(`/api/post/${post_id}`, { caption }).then(resp => {
      this.props.updatePosts(resp.data);
    });

    this.setState({
      editing: !this.state.editing
    });
  };

  handleDeletePost = () => {
    const { post_id } = this.props.post;
    const { id } = this.props;
    axios.delete(`/api/post/${post_id}`, { id }).then(resp => {
      this.props.updatePosts(resp.data);
    });
  };

  handleDisplayComments = () => {
    console.log("hit display comment");
    const { post_id } = this.props.post;

    this.props.selectPostID(post_id);
  };

  render() {
    const {
      img_url,
      post_id,
      username,
      profile_pic,
      caption
    } = this.props.post;

    return (
      <div
        style={{
          marginTop: "15px"
        }}
      >
        <div className="post-header-content">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: "40px",
              marginBottom: "3px"
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
            <p style={{ margin: "0", fontWeight: "bold" }}>{username}</p>
          </div>

          <div
            style={{
              display: "flex",
              alignContent: "center",
              justifyContent: "center",
              marginRight: "3%"
            }}
          >
            <EllipsisMenuButton />
          </div>
        </div>
        <img
          // onLoad={() => this.setState({ loading: false })}
          alt={post_id}
          src={img_url}
          width="100%"
          // width={this.state.loading ? "0%" : "100%"}
          height="300px"
          // style={this.state.loading ? { backgroundColor: "blue" } : {}}
        />
        <div
          className="post-footer-content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div>
              <LikeButton />
            </div>
            <div onClick={this.handleDisplayComments}>
              <CommentButton />
            </div>
          </div>
          {this.props.post.user_id === this.props.id ? (
            <div style={{ display: "flex", justifyContent: "center" }}>
              {this.state.editing === false ? (
                <div onClick={this.handleEditToggle}>
                  <EditCaptionButton />
                </div>
              ) : (
                <div onClick={this.handleSubmitEdit}>
                  <SaveButton />
                </div>
              )}
              <div onClick={this.handleDeletePost}>
                <DeletePostButton />
              </div>
            </div>
          ) : null}
        </div>
        <p style={{ margin: "0" }}>Likes</p>
        {this.state.editing === true ? (
          <div style={{ display: "flex" }}>
            <p style={{ margin: "0", fontWeight: "bold" }}>{username}</p>
            {"  "}
            <textarea
              style={{
                rows: "2",
                marginLeft: "5px",
                width: "80%",
                fontSize: "1em"
              }}
              value={this.state.caption}
              onChange={this.handleChange}
            />
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              overflowWrap: "break-word",
              overflow: "scroll"
            }}
          >
            <p style={{ margin: "0", fontWeight: "bold" }}>{username}</p>
            {"   "}
            <div
              style={{
                margin: 0,
                marginLeft: "5px",
                width: "80%",
                fontSize: "1em",
                height: "40px"
              }}
            >
              {caption}
            </div>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.auth_reducer.id
  };
};

const mapDispatchToProps = {
  updatePosts,
  selectPostID
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

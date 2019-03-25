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
      caption: this.props.post.caption,
      likes: 0,
      likedByUser: false
    };
  }

  componentDidMount = async () => {
    await this.handleGetLikes();
    this.handleCheckIfLiked();
  };

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
    const { post_id } = this.props.post;

    this.props.selectPostID(post_id);
  };

  handleGetLikes = () => {
    const { post_id } = this.props.post;
    axios.post(`/api/likes/${post_id}`).then(resp => {
      this.setState({
        likes: resp.data[0].count
      });
    });
  };

  handleCheckIfLiked = () => {
    const { post_id } = this.props.post;
    axios
      .post(`/api/liked/${post_id}`)
      .then(resp => {
        if (resp.data[0].count > 0) {
          this.setState({
            likedByUser: true
          });
        } else {
          this.setState({
            likedByUser: false
          });
        }
      })
      .catch(err => {
        console.log("hit catch of handleCheckIfLiked");
      });
  };

  handleAddLike = () => {
    const { post_id } = this.props.post;
    axios
      .post(`/api/like/${post_id}`)
      .then(resp => {
        this.setState({
          likedByUser: true
        });

        this.handleGetLikes();
      })

      .catch(err => {
        console.log("hit catch of handleAddLike");
      });
  };

  handleDeleteLike = () => {
    const { post_id } = this.props.post;
    axios
      .post(`/api/likeddelete/${post_id}`)
      .then(resp => {
        this.setState({
          likedByUser: false
        });
        this.handleGetLikes();
      })
      .catch(err => {
        console.log("hit catch of handleDeleteLike");
      });
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
              marginBottom: "3px",
              justifyContent: "space-between"
            }}
          >
            <div style={{ display: "flex" }}>
              <div className="post-profile-pic-container">
                <img
                  className="post-profile-pic"
                  padding="0"
                  width="90%"
                  height="90%"
                  src={profile_pic}
                />
              </div>
              <div style={{ display: "flex", alignItems: "center" }}>
                <div style={{ margin: "0", fontWeight: "bold" }}>
                  {username}
                </div>
              </div>
            </div>
            <div>
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
          </div>
        </div>
        <img alt={post_id} src={img_url} width="100%" height="300px" />
        <div
          className="post-footer-content"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <div>
              <LikeButton
                likedByUser={this.state.likedByUser}
                handleAddLike={this.handleAddLike}
                handleDeleteLike={this.handleDeleteLike}
                username={username}
              />
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
        <div
          style={{
            display: "flex",
            alignContent: "center",
            fontSize: ".9em",
            fontWeight: "bold"
          }}
        >
          {username == "todd" && this.state.likes > 0 ? (
            <div>{this.state.likes * Math.floor(Math.random() * 10000)} </div>
          ) : (
            <div>{this.state.likes}</div>
          )}
          {username == "todd" && this.state.likes > 0 ? (
            <div style={{ marginLeft: "3px" }}>dislikes</div>
          ) : (
            <div style={{ marginLeft: "3px" }}>likes</div>
          )}
        </div>
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

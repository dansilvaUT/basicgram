import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { updatePosts } from "../../ducks/reducers/post_reducer";
import {
  clearComments,
  resetHideComments
} from "../../ducks/reducers/comment_reducer";
import PostList from "../Posts/PostList";
import CommentList from "../Posts/Comments/CommentList";

class Search extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: "",
      opacity: "faded"
    };
  }

  componentDidMount() {
    this.checkUser();
  }

  checkUser = async () => {
    const { id } = this.props;
    if (!id) {
      try {
        let res = await axios.get("/api/currentuser");
        this.props.updateUser(res.data);
      } catch (err) {
        this.props.history.push("/");
      }
    }
  };

  componentWillUnmount() {
    this.props.resetHideComments();
  }

  handleToggleCommentDisplay = async () => {
    await this.props.clearComments();
  };

  handleSearch = () => {};

  handleChange = async e => {
    await this.setState({
      search: e.target.value
    });

    if (this.state.search !== "") {
      this.setState({
        opacity: "solid"
      });
    } else {
      this.setState({
        opacity: "faded"
      });
    }
  };

  render() {
    const { id } = this.props;
    if (!id) return <Redirect to="/" />;
    return (
      <div>
        <div
          className={
            this.props.hideComments
              ? "hidden"
              : this.props.showComments
              ? "show"
              : "hide"
          }
        >
          <CommentList
            handleToggleCommentDisplay={this.handleToggleCommentDisplay}
          />
        </div>
        <div
          className="headers"
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
        >
          <div
            className="comment-input-section"
            style={{
              borderWidth: "1px",
              borderRadius: "16px",
              paddingRight: "5px",
              paddingLeft: "5px"
            }}
          >
            <input
              value={this.state.search}
              onChange={this.handleChange}
              placeholder="Search Posts By Username"
              style={{ textAlign: "center" }}
            />
            <button
              className={this.props.showComments ? "solid" : this.state.opacity}
              onClick={this.handleSearch}
              style={{ fontWeight: "bold", color: "blue", fontSize: 12 }}
            >
              SEARCHING
            </button>
          </div>
        </div>
        <div className="content">
          <PostList search={this.state.search.toLowerCase()} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.auth_reducer.id,
    showComments: reduxState.comment_reducer.showComments,
    hideComments: reduxState.comment_reducer.hideComments,
    post_id: reduxState.comment_reducer.post_id
  };
};

const mapDispatchToProps = {
  updatePosts,
  clearComments,
  resetHideComments
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);

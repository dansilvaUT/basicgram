import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser, updateUser } from "../../ducks/reducers/auth_reducer";
import { updatePosts } from "../../ducks/reducers/post_reducer";
import {
  clearComments,
  resetHideComments
} from "../../ducks/reducers/comment_reducer";
import HomeHeader from "./HomeHeader";
import PostList from "../Posts/PostList";
import CommentList from "../Posts/Comments/CommentList";

class Home extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.setState({ loading: true });
    this.getUser();
    this.getPosts();
  }

  getUser = async () => {
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

  getPosts = async () => {
    try {
      let res = await axios.get("/api/posts");
      this.props.updatePosts(res.data);
      // this.setState({ loading: false });
    } catch (err) {
      console.log("unable to retrieve posts");
    }
  };

  handleToggleCommentDisplay = async () => {
    await this.props.clearComments();
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

        <div className="headers">
          <HomeHeader />
        </div>

        <div className="content">
          <PostList />
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
  clearUser,
  clearComments,
  resetHideComments,
  updateUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

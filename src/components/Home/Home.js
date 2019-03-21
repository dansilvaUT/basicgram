import React, { Component } from "react";
import axios from "axios";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { clearUser } from "../../ducks/reducers/auth_reducer";
import { updatePosts } from "../../ducks/reducers/post_reducer";
import HomeHeader from "./HomeHeader";
// import Spinner from "react-spinkit";
import PostList from "../Posts/PostList";
import CommentList from "../Posts/Comments/CommentList";

class Home extends Component {
  // constructor(props) {
  //   super(props);

  // this.state = {
  //   loading: false
  // };
  // }

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

  getPosts = async () => {
    try {
      let res = await axios.get("/api/posts");
      this.props.updatePosts(res.data);
      // this.setState({ loading: false });
    } catch (err) {
      console.log("unable to retrieve posts");
    }
  };

  render() {
    const { id } = this.props;
    if (!id) return <Redirect to="/" />;
    // console.log(this.props.posts);
    // if (this.props.posts.length) {
    //   console.log(this.props.posts[0].img_url);
    // }
    return (
      <div>
        {/* { (
          <Spinner name="ball-scale-ripple-multiple" color="fuchsia" />
        ) : ( */}

        {!this.props.showComments ? (
          <div className="headers">
            <HomeHeader />
          </div>
        ) : (
          <div className="headers">
            <HomeHeader />
          </div>
        )}
        <div className="content">
          <PostList />
        </div>
        {/* {!this.props.showComments ? (
            <div className="content">
              <PostList />
            </div>
          ) : (
            <div className="comments">
              <CommentList />
            </div>
          )} */}
        {this.props.showComments && (
          <div className="test-div">
            <CommentList />
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.auth_reducer.id,
    showComments: reduxState.comment_reducer.showComments,
    post_id: reduxState.comment_reducer.post_id
  };
};

const mapDispatchToProps = {
  updatePosts,
  clearUser
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);

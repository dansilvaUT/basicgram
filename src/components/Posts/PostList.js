import React, { Component } from "react";
import { connect } from "react-redux";
import Post from "./Post";
import Spinner from "react-spinkit";

class PostList extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.search) {
      if (this.props.posts.length) {
        const mappedPosts = this.props.posts
          .filter(post => {
            return post.username.toLowerCase().includes(this.props.search);
          })
          .map(post => {
            return (
              <Post
                key={post.post_id}
                post={post}
                id={this.props.id}
                height="50vh"
              />
            );
          });
        return <div>{mappedPosts}</div>;
      } else
        return (
          <div
            className="post-list-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "80vh"
            }}
          >
            <Spinner className="loader" name="ball-grid-pulse" />
          </div>
        );
    } else {
      if (this.props.posts.length) {
        const mappedPosts = this.props.posts.map(post => {
          return (
            <Post
              key={post.post_id}
              post={post}
              id={this.props.id}
              height="50vh"
            />
          );
        });
        return <div>{mappedPosts}</div>;
      } else
        return (
          <div
            className="post-list-container"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              alignContent: "center",
              height: "80vh"
            }}
          >
            <Spinner className="loader" name="ball-grid-pulse" />
          </div>
        );
    }
  }
}

const mapStateToProps = reduxState => {
  return {
    id: reduxState.auth_reducer.id,
    posts: reduxState.post_reducer.posts
  };
};

export default connect(mapStateToProps)(PostList);
